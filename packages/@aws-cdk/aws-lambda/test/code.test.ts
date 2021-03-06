import '@aws-cdk/assert/jest';
import * as path from 'path';
import { ResourcePart } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as cxapi from '@aws-cdk/cx-api';
import * as lambda from '../lib';

/* eslint-disable dot-notation */

describe('code', () => {
  describe('lambda.Code.fromInline', () => {
    test('fails if used with unsupported runtimes', () => {
      expect(() => defineFunction(lambda.Code.fromInline('boom'), lambda.Runtime.GO_1_X)).toThrow(/Inline source not allowed for go1\.x/);
      expect(() => defineFunction(lambda.Code.fromInline('boom'), lambda.Runtime.JAVA_8)).toThrow(/Inline source not allowed for java8/);
    });
    test('fails if larger than 4096 bytes', () => {
      expect(() => defineFunction(lambda.Code.fromInline(generateRandomString(4097)), lambda.Runtime.NODEJS_10_X))
        .toThrow(/Lambda source is too large, must be <= 4096 but is 4097/);
    });
  });
  describe('lambda.Code.fromAsset', () => {
    test('fails if a non-zip asset is used', () => {
      // GIVEN
      const fileAsset = lambda.Code.fromAsset(path.join(__dirname, 'my-lambda-handler', 'index.py'));

      // THEN
      expect(() => defineFunction(fileAsset)).toThrow(/Asset must be a \.zip file or a directory/);
    });

    test('only one Asset object gets created even if multiple functions use the same AssetCode', () => {
      // GIVEN
      const app = new cdk.App();
      const stack = new cdk.Stack(app, 'MyStack');
      const directoryAsset = lambda.Code.fromAsset(path.join(__dirname, 'my-lambda-handler'));

      // WHEN
      new lambda.Function(stack, 'Func1', {
        handler: 'foom',
        runtime: lambda.Runtime.NODEJS_10_X,
        code: directoryAsset,
      });

      new lambda.Function(stack, 'Func2', {
        handler: 'foom',
        runtime: lambda.Runtime.NODEJS_10_X,
        code: directoryAsset,
      });

      // THEN
      const assembly = app.synth();
      const synthesized = assembly.stacks[0];

      // Func1 has an asset, Func2 does not
      expect(synthesized.assets.length).toEqual(1);
    });

    test('adds code asset metadata', () => {
      // GIVEN
      const stack = new cdk.Stack();
      stack.node.setContext(cxapi.ASSET_RESOURCE_METADATA_ENABLED_CONTEXT, true);

      const location = path.join(__dirname, 'my-lambda-handler');

      // WHEN
      new lambda.Function(stack, 'Func1', {
        code: lambda.Code.fromAsset(location),
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: 'foom',
      });

      // THEN
      expect(stack).toHaveResource('AWS::Lambda::Function', {
        Metadata: {
          [cxapi.ASSET_RESOURCE_METADATA_PATH_KEY]: 'asset.9678c34eca93259d11f2d714177347afd66c50116e1e08996eff893d3ca81232',
          [cxapi.ASSET_RESOURCE_METADATA_PROPERTY_KEY]: 'Code',
        },
      }, ResourcePart.CompleteDefinition);
    });
  });

  describe('lambda.Code.fromCfnParameters', () => {
    test("automatically creates the Bucket and Key parameters when it's used in a Function", () => {
      const stack = new cdk.Stack();
      const code = new lambda.CfnParametersCode();
      new lambda.Function(stack, 'Function', {
        code,
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: 'index.handler',
      });

      expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
        Code: {
          S3Bucket: {
            Ref: 'FunctionLambdaSourceBucketNameParameter9E9E108F',
          },
          S3Key: {
            Ref: 'FunctionLambdaSourceObjectKeyParameter1C7AED11',
          },
        },
      });

      expect(stack.resolve(code.bucketNameParam)).toEqual('FunctionLambdaSourceBucketNameParameter9E9E108F');
      expect(stack.resolve(code.objectKeyParam)).toEqual('FunctionLambdaSourceObjectKeyParameter1C7AED11');
    });

    test('does not allow accessing the Parameter properties before being used in a Function', () => {
      const code = new lambda.CfnParametersCode();

      expect(() => code.bucketNameParam).toThrow(/bucketNameParam/);

      expect(() => code.objectKeyParam).toThrow(/objectKeyParam/);
    });

    test('allows passing custom Parameters when creating it', () => {
      const stack = new cdk.Stack();
      const bucketNameParam = new cdk.CfnParameter(stack, 'BucketNameParam', {
        type: 'String',
      });
      const bucketKeyParam = new cdk.CfnParameter(stack, 'ObjectKeyParam', {
        type: 'String',
      });

      const code = lambda.Code.fromCfnParameters({
        bucketNameParam,
        objectKeyParam: bucketKeyParam,
      });

      expect(stack.resolve(code.bucketNameParam)).toEqual('BucketNameParam');
      expect(stack.resolve(code.objectKeyParam)).toEqual('ObjectKeyParam');

      new lambda.Function(stack, 'Function', {
        code,
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: 'index.handler',
      });

      expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
        Code: {
          S3Bucket: {
            Ref: 'BucketNameParam',
          },
          S3Key: {
            Ref: 'ObjectKeyParam',
          },
        },
      });
    });

    test('can assign parameters', () => {
      // given
      const stack = new cdk.Stack();
      const code = new lambda.CfnParametersCode({
        bucketNameParam: new cdk.CfnParameter(stack, 'BucketNameParam', {
          type: 'String',
        }),
        objectKeyParam: new cdk.CfnParameter(stack, 'ObjectKeyParam', {
          type: 'String',
        }),
      });

      // when
      const overrides = stack.resolve(code.assign({
        bucketName: 'SomeBucketName',
        objectKey: 'SomeObjectKey',
      }));

      // then
      expect(overrides['BucketNameParam']).toEqual('SomeBucketName');
      expect(overrides['ObjectKeyParam']).toEqual('SomeObjectKey');
    });
  });
});

function defineFunction(code: lambda.Code, runtime: lambda.Runtime = lambda.Runtime.NODEJS_10_X) {
  const stack = new cdk.Stack();
  return new lambda.Function(stack, 'Func', {
    handler: 'foom',
    code,
    runtime,
  });
}

function generateRandomString(bytes: number) {
  let s = '';
  for (let i = 0; i < bytes; ++i) {
    s += String.fromCharCode(Math.round(Math.random() * 256));
  }
  return s;
}
