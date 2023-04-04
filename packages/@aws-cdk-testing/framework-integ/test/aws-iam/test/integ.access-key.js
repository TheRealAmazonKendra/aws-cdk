"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const app = new aws_cdk_lib_1.App();
const stack = new aws_cdk_lib_1.Stack(app, 'integ-iam-access-key-1');
const user = new aws_iam_1.User(stack, 'TestUser');
const accessKey = new aws_iam_1.AccessKey(stack, 'TestAccessKey', { user });
new aws_cdk_lib_1.CfnOutput(stack, 'AccessKeyId', { value: accessKey.accessKeyId });
new integ_tests_alpha_1.IntegTest(app, 'iam-access-key-1', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuYWNjZXNzLWtleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLmFjY2Vzcy1rZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBb0Q7QUFDcEQsa0VBQXVEO0FBQ3ZELGlEQUFzRDtBQUV0RCxNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUM7QUFFdkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVsRSxJQUFJLHVCQUFTLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUV0RSxJQUFJLDZCQUFTLENBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFO0lBQ3JDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztDQUNuQixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHAsIENmbk91dHB1dCwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBJbnRlZ1Rlc3QgfSBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXksIFVzZXIgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2soYXBwLCAnaW50ZWctaWFtLWFjY2Vzcy1rZXktMScpO1xuXG5jb25zdCB1c2VyID0gbmV3IFVzZXIoc3RhY2ssICdUZXN0VXNlcicpO1xuY29uc3QgYWNjZXNzS2V5ID0gbmV3IEFjY2Vzc0tleShzdGFjaywgJ1Rlc3RBY2Nlc3NLZXknLCB7IHVzZXIgfSk7XG5cbm5ldyBDZm5PdXRwdXQoc3RhY2ssICdBY2Nlc3NLZXlJZCcsIHsgdmFsdWU6IGFjY2Vzc0tleS5hY2Nlc3NLZXlJZCB9KTtcblxubmV3IEludGVnVGVzdChhcHAsICdpYW0tYWNjZXNzLWtleS0xJywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG59KTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=