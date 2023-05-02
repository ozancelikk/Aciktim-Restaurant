import { Responsemodel } from "./responseModel";

export interface ListResponseModel<T> extends Responsemodel{
    data:T[];
}