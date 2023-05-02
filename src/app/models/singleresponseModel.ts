import { Responsemodel } from "./responseModel";

export interface SingleResponseModel<T> extends Responsemodel{
    data:T;
}