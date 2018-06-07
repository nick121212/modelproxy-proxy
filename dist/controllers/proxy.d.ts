import { ModelProxy } from "modelproxy";
import { Request, Response } from "express";
/**
 * 接口转发路由
 */
export declare class UserController {
    private $mp;
    constructor($mp: ModelProxy);
    /**
     * 转发接口
     *  先判断ns和key是否存在
     *  然后瓶装参数之后转发接口
     * @param   {string}       ns           接口命名空间
     * @param   {string}       key          接口的Key值
     * @param   {Request}      request      request对象
     * @param   {Response}     _response    response对象
     * @param   {any}          params       参数
     * @param   {any}          data         数据
     * @returns {Promise<any>}
     */
    execute(ns: string, key: string, request: Request, _response: Response, params: any, data: any): Promise<any>;
}
