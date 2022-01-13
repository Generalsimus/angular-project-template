import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullPartial } from '../interface/generics';
import { CacheController } from '../helpers/CacheController';
import { CacheQuery } from '../helpers/CacheQuery';
import { Post } from '../interface/post';


/**
 *
 *
 * @export
 * @class UserService ქმნის სერვისს რომელმაც უნდა მოგვაწოდოს პოსტების დოკუმნტის შესხებ მონაცმები
 * @extends {CacheController<Post>} შემოქვს  CacheController რომელსაც ჩაეწოდება დოკუმნტის ტიპი რომელზეც უნდა მოადინოს მანიპულაციაა
 */
@Injectable({ providedIn: 'root' })
export class PostService extends CacheController<Post>{
    constructor(http: HttpClient) {
        super("https://jsonplaceholder.typicode.com/posts", http);
    }
    @CacheQuery()
    //TODO: რეალურ პროექტში გამოვიყენებდით უკვე არსებულ CacheController ის ფუნქციებს
    async getPosts(args: FullPartial<Post>) {
        return (this.items = (await this.request<Post[]>("get", args)))
    }

}