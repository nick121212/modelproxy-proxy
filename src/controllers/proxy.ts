import { Param, Get, Post, Req, QueryParams, Body, Controller, Res, HttpError } from "routing-controllers";
import { injectable, inject } from "inversify";
import { ModelProxy } from "modelproxy";
import { Request, Response } from "express";

/**
 * 接口转发路由
 */
@injectable()
@Controller("/proxy")
export class UserController {

    constructor(@inject("mp") private $mp: ModelProxy) { }

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
    @Get("/:ns/:key")
    @Post("/:ns/:key")
    async execute(@Param("ns") ns: string,
        @Param("key") key: string,
        @Req() request: Request,
        @Res() _response: Response,
        @QueryParams() params: any = {},
        @Body({ required: false }) data: any) {

        const nsFactory = this.$mp.getNs(ns);
        let interFace;

        if (!nsFactory) {
            throw new HttpError(404,"没有找到命名空间！")
        }

        interFace = nsFactory.get(key);

        if (!interFace) {
            throw new HttpError(404,"没有找到接口！")
        }

        const { method } = request;
        const options = {
            params,
            data,
            instance: {
                engine: "fetch"
            },
            settings: {
                cache: false
            }
        };

        switch (method) {
            case "POST":
                return await interFace.post(options, {
                    response: _response,
                    request
                });
            case "GET":
                return await interFace.get(params.id, options, {
                    response: _response,
                    request
                });
        }
    }
}