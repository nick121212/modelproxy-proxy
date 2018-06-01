import { Interceptor, InterceptorInterface, Action } from "routing-controllers";
import { injectable } from "inversify";

@Interceptor()
@injectable()
export class NameCorrectionInterceptor implements InterceptorInterface {

    intercept(_action: Action, content: any) {
        return content;
    }

}