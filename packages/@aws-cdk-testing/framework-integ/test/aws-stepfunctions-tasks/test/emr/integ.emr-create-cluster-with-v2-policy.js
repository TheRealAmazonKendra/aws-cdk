"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sfn = require("aws-cdk-lib/aws-stepfunctions");
const aws_cdk_lib_1 = require("aws-cdk-lib");
// eslint-disable-next-line import/no-extraneous-dependencies
const cx_api_1 = require("aws-cdk-lib/cx-api");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const aws_stepfunctions_tasks_1 = require("aws-cdk-lib/aws-stepfunctions-tasks");
const enableEmrServicePolicyV2 = { [cx_api_1.ENABLE_EMR_SERVICE_POLICY_V2]: true };
const app = new aws_cdk_lib_1.App({
    context: enableEmrServicePolicyV2,
});
const stack = new aws_cdk_lib_1.Stack(app, 'aws-cdk-emr-create-cluster');
new aws_stepfunctions_tasks_1.EmrCreateCluster(stack, 'EmrCreateCluster', {
    instances: {},
    name: 'Cluster',
    integrationPattern: sfn.IntegrationPattern.RUN_JOB,
});
new integ_tests_alpha_1.IntegTest(app, 'EmrCreateClusterTest', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuZW1yLWNyZWF0ZS1jbHVzdGVyLXdpdGgtdjItcG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcuZW1yLWNyZWF0ZS1jbHVzdGVyLXdpdGgtdjItcG9saWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQXFEO0FBQ3JELDZDQUF5QztBQUN6Qyw2REFBNkQ7QUFDN0QsK0NBQWtFO0FBQ2xFLGtFQUF1RDtBQUN2RCxpRkFBdUU7QUFFdkUsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUMscUNBQTRCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUUxRSxNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLENBQUM7SUFDbEIsT0FBTyxFQUFFLHdCQUF3QjtDQUNsQyxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFFM0QsSUFBSSwwQ0FBZ0IsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUU7SUFDOUMsU0FBUyxFQUFFLEVBQUU7SUFDYixJQUFJLEVBQUUsU0FBUztJQUNmLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO0NBQ25ELENBQUMsQ0FBQztBQUVILElBQUksNkJBQVMsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLEVBQUU7SUFDekMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ25CLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNmbiBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3RlcGZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBBcHAsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgRU5BQkxFX0VNUl9TRVJWSUNFX1BPTElDWV9WMiB9IGZyb20gJ2F3cy1jZGstbGliL2N4LWFwaSc7XG5pbXBvcnQgeyBJbnRlZ1Rlc3QgfSBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgeyBFbXJDcmVhdGVDbHVzdGVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMtdGFza3MnO1xuXG5jb25zdCBlbmFibGVFbXJTZXJ2aWNlUG9saWN5VjIgPSB7IFtFTkFCTEVfRU1SX1NFUlZJQ0VfUE9MSUNZX1YyXTogdHJ1ZSB9O1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKHtcbiAgY29udGV4dDogZW5hYmxlRW1yU2VydmljZVBvbGljeVYyLFxufSk7XG5cbmNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2F3cy1jZGstZW1yLWNyZWF0ZS1jbHVzdGVyJyk7XG5cbm5ldyBFbXJDcmVhdGVDbHVzdGVyKHN0YWNrLCAnRW1yQ3JlYXRlQ2x1c3RlcicsIHtcbiAgaW5zdGFuY2VzOiB7fSxcbiAgbmFtZTogJ0NsdXN0ZXInLFxuICBpbnRlZ3JhdGlvblBhdHRlcm46IHNmbi5JbnRlZ3JhdGlvblBhdHRlcm4uUlVOX0pPQixcbn0pO1xuXG5uZXcgSW50ZWdUZXN0KGFwcCwgJ0VtckNyZWF0ZUNsdXN0ZXJUZXN0Jywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG59KTtcblxuYXBwLnN5bnRoKCk7Il19