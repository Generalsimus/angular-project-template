import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';
import { checkDeepEqual } from '../utils/checkDeepEqual';
import { FullPartial } from '../interface/generics';
import { CacheController } from '../helpers/CacheController';
import { CacheQuery } from '../helpers/CacheQuery';


/**
 *
 *
 * @export
 * @class UserService ქმნის სერვისს რომელმაც უნდა მოგვაწოდოს იუზერის დოკუმნტის შესხებ მონაცმები
 * @extends {CacheController<User>} შემოქვს  CacheController რომელსაც ჩეწოდება დოკუმნტის ტიპი რომელზეც უნდა მოადინოს მანიპულაციაა
 */
@Injectable({ providedIn: 'root' })
export class UserService extends CacheController<User>{
    constructor(http: HttpClient) {
        super("https://jsonplaceholder.typicode.com/users", http);
    }
    @CacheQuery()
    //TODO: რეალურ პროექტში გამოვიყენებდით უკვე არსებულ CacheController ის ფუნქციებს
    async getUsers(args: FullPartial<User>) {
        return (await this.request<User[]>("get", args))
    }
    //TODO: რეალურ პროექტში გამოვიყენებდით უკვე არსებულ CacheController ის ფუნქციებს
    @CacheQuery()
    async getUser(args: FullPartial<User>) {
        const find = (users: User[]) => users?.find((userItem) => {
            if (checkDeepEqual(userItem, args)) {
                return true
            }
            return false
        })

        return find(this.items) || find((await this.getUsers(args)))
    }
}