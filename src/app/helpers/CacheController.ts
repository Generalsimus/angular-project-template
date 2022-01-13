import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { checkDeepEqual } from '../utils/checkDeepEqual';
import { FullPartial } from '../interface/generics';
import { CacheQuery } from './CacheQuery';

/**
 *
 *
 * @export
 * @class CacheController ახდენს მონაცემების შენახვას და ამ მონაცმეებზე მანიპულაციას
 * @template Model არის რომელიმე დოკუმენტსი ტიპი რომელის ბაზიდან დაბრუნდება
 */
type RequestTypes = "get" | "post" | "put" | "delete";
const UNIQ_KEY = "id"
// TODO: რეალურ პროექტზე ცოტა განსხვავებული რექვესთები იქნებოდა
export class CacheController<Model extends Required<{ [UNIQ_KEY]: any }>> {
    requestPath: string;
    constructor(requestPath: string, private http: HttpClient) {
        console.log(this.constructor.name,)
        this.requestPath = requestPath
    }
    
    items: Model[] = [];
    request<T, OptionsType = Parameters<typeof this.http.request>[2]>(type: RequestTypes, params?: Record<string, any>, path: string = "", options?: OptionsType) {
        return new Promise<T>((resolve) => this.http.request<T>(type, this.requestPath + path.trim().replace(/^\b|\\|\b$/g, "/"), {
            params: params,
            // body: params,
            responseType: 'json',
            ...options
        }).subscribe(resolve))
    }
    @CacheQuery()
    async find(args: FullPartial<Model>) {
        return (await this.request<Model[]>("get", args, "find"))
    }
    @CacheQuery()
    async findOne(args: FullPartial<Model>) {
        return this.items.find((item) => {
            if (checkDeepEqual(item, args)) {
                return true
            }
            return false
        }) || (await this.request<Model>("get", args, "findOne"))
    }
    async add(args: Model) {
        const response = await this.request<Model>("post", args, "add")
        this.items = [...this.items, response]
        return response
    }
    async update(args: FullPartial<Model>) {
        const response = await this.request<Model>("put", args, "add")
        this.items = this.items.map((item) => {
            if (item[UNIQ_KEY] === args[UNIQ_KEY]) {
                return response
            }
            return item
        })
        return response
    }
    async delete(args: FullPartial<Model>) {
        const response = await this.request<Model>("delete", args, "/")
        this.items = this.items.filter((item) => item[UNIQ_KEY] !== args[UNIQ_KEY])
        return response;
    }
}