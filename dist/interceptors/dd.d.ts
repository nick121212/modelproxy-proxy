import { InterceptorInterface, Action } from "routing-controllers";
export declare class NameCorrectionInterceptor implements InterceptorInterface {
    intercept(_action: Action, content: any): any;
}
