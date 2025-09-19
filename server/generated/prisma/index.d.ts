
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model TipEntry
 * 
 */
export type TipEntry = $Result.DefaultSelection<Prisma.$TipEntryPayload>
/**
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model TipTxs
 * 
 */
export type TipTxs = $Result.DefaultSelection<Prisma.$TipTxsPayload>
/**
 * Model cVolume
 * 
 */
export type cVolume = $Result.DefaultSelection<Prisma.$cVolumePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  Live: 'Live',
  Scheduled: 'Scheduled',
  Ended: 'Ended'
};

export type Status = (typeof Status)[keyof typeof Status]


export const StreamerRole: {
  guest: 'guest',
  host: 'host',
  viewer: 'viewer'
};

export type StreamerRole = (typeof StreamerRole)[keyof typeof StreamerRole]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type StreamerRole = $Enums.StreamerRole

export const StreamerRole: typeof $Enums.StreamerRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Streams
 * const streams = await prisma.stream.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Streams
   * const streams = await prisma.stream.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tipTxs`: Exposes CRUD operations for the **TipTxs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TipTxs
    * const tipTxs = await prisma.tipTxs.findMany()
    * ```
    */
  get tipTxs(): Prisma.TipTxsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cVolume`: Exposes CRUD operations for the **cVolume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CVolumes
    * const cVolumes = await prisma.cVolume.findMany()
    * ```
    */
  get cVolume(): Prisma.cVolumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Stream: 'Stream',
    Notification: 'Notification',
    TipTxs: 'TipTxs',
    cVolume: 'cVolume',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "stream" | "notification" | "tipTxs" | "cVolume" | "user"
      txIsolationLevel: never
    }
    model: {
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.StreamFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.StreamAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NotificationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NotificationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      TipTxs: {
        payload: Prisma.$TipTxsPayload<ExtArgs>
        fields: Prisma.TipTxsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TipTxsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TipTxsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          findFirst: {
            args: Prisma.TipTxsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TipTxsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          findMany: {
            args: Prisma.TipTxsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>[]
          }
          create: {
            args: Prisma.TipTxsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          createMany: {
            args: Prisma.TipTxsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TipTxsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          update: {
            args: Prisma.TipTxsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          deleteMany: {
            args: Prisma.TipTxsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TipTxsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TipTxsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipTxsPayload>
          }
          aggregate: {
            args: Prisma.TipTxsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipTxs>
          }
          groupBy: {
            args: Prisma.TipTxsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipTxsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TipTxsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TipTxsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TipTxsCountArgs<ExtArgs>
            result: $Utils.Optional<TipTxsCountAggregateOutputType> | number
          }
        }
      }
      cVolume: {
        payload: Prisma.$cVolumePayload<ExtArgs>
        fields: Prisma.cVolumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cVolumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cVolumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          findFirst: {
            args: Prisma.cVolumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cVolumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          findMany: {
            args: Prisma.cVolumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>[]
          }
          create: {
            args: Prisma.cVolumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          createMany: {
            args: Prisma.cVolumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.cVolumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          update: {
            args: Prisma.cVolumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          deleteMany: {
            args: Prisma.cVolumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cVolumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.cVolumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cVolumePayload>
          }
          aggregate: {
            args: Prisma.CVolumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCVolume>
          }
          groupBy: {
            args: Prisma.cVolumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CVolumeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.cVolumeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.cVolumeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.cVolumeCountArgs<ExtArgs>
            result: $Utils.Optional<CVolumeCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    stream?: StreamOmit
    notification?: NotificationOmit
    tipTxs?: TipTxsOmit
    cVolume?: cVolumeOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model TipEntry
   */





  export type TipEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    token?: boolean
    amount?: boolean
    tipper?: boolean
  }, ExtArgs["result"]["tipEntry"]>



  export type TipEntrySelectScalar = {
    token?: boolean
    amount?: boolean
    tipper?: boolean
  }

  export type TipEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"token" | "amount" | "tipper", ExtArgs["result"]["tipEntry"]>

  export type $TipEntryPayload = {
    name: "TipEntry"
    objects: {}
    scalars: {
      token: string | null
      amount: string | null
      tipper: string | null
    }
    composites: {}
  }

  type TipEntryGetPayload<S extends boolean | null | undefined | TipEntryDefaultArgs> = $Result.GetResult<Prisma.$TipEntryPayload, S>





  /**
   * Fields of the TipEntry model
   */
  interface TipEntryFieldRefs {
    readonly token: FieldRef<"TipEntry", 'String'>
    readonly amount: FieldRef<"TipEntry", 'String'>
    readonly tipper: FieldRef<"TipEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TipEntry without action
   */
  export type TipEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipEntry
     */
    select?: TipEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipEntry
     */
    omit?: TipEntryOmit<ExtArgs> | null
  }


  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamAvgAggregateOutputType = {
    viewers: number | null
  }

  export type StreamSumAggregateOutputType = {
    viewers: number | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    title: string | null
    date: string | null
    creatorToken: string | null
    viewers: number | null
    pfp: string | null
    thumbnail: string | null
    status: $Enums.Status | null
    streamer: string | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    title: string | null
    date: string | null
    creatorToken: string | null
    viewers: number | null
    pfp: string | null
    thumbnail: string | null
    status: $Enums.Status | null
    streamer: string | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    roomId: number
    title: number
    date: number
    creatorToken: number
    viewers: number
    pfp: number
    thumbnail: number
    status: number
    streamer: number
    _all: number
  }


  export type StreamAvgAggregateInputType = {
    viewers?: true
  }

  export type StreamSumAggregateInputType = {
    viewers?: true
  }

  export type StreamMinAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    date?: true
    creatorToken?: true
    viewers?: true
    pfp?: true
    thumbnail?: true
    status?: true
    streamer?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    date?: true
    creatorToken?: true
    viewers?: true
    pfp?: true
    thumbnail?: true
    status?: true
    streamer?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    date?: true
    creatorToken?: true
    viewers?: true
    pfp?: true
    thumbnail?: true
    status?: true
    streamer?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _avg?: StreamAvgAggregateInputType
    _sum?: StreamSumAggregateInputType
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    roomId: string
    title: string
    date: string | null
    creatorToken: string | null
    viewers: number
    pfp: string
    thumbnail: string | null
    status: $Enums.Status
    streamer: string
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    title?: boolean
    date?: boolean
    creatorToken?: boolean
    viewers?: boolean
    pfp?: boolean
    thumbnail?: boolean
    status?: boolean
    streamer?: boolean
  }, ExtArgs["result"]["stream"]>



  export type StreamSelectScalar = {
    id?: boolean
    roomId?: boolean
    title?: boolean
    date?: boolean
    creatorToken?: boolean
    viewers?: boolean
    pfp?: boolean
    thumbnail?: boolean
    status?: boolean
    streamer?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "title" | "date" | "creatorToken" | "viewers" | "pfp" | "thumbnail" | "status" | "streamer", ExtArgs["result"]["stream"]>

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      title: string
      date: string | null
      creatorToken: string | null
      viewers: number
      pfp: string
      thumbnail: string | null
      status: $Enums.Status
      streamer: string
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * @param {StreamFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const stream = await prisma.stream.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: StreamFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Stream.
     * @param {StreamAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const stream = await prisma.stream.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: StreamAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly roomId: FieldRef<"Stream", 'String'>
    readonly title: FieldRef<"Stream", 'String'>
    readonly date: FieldRef<"Stream", 'String'>
    readonly creatorToken: FieldRef<"Stream", 'String'>
    readonly viewers: FieldRef<"Stream", 'Int'>
    readonly pfp: FieldRef<"Stream", 'String'>
    readonly thumbnail: FieldRef<"Stream", 'String'>
    readonly status: FieldRef<"Stream", 'Status'>
    readonly streamer: FieldRef<"Stream", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to delete.
     */
    limit?: number
  }

  /**
   * Stream findRaw
   */
  export type StreamFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Stream aggregateRaw
   */
  export type StreamAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    recentFollows: number | null
  }

  export type NotificationSumAggregateOutputType = {
    recentFollows: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    username: string | null
    read: boolean | null
    followContent: string | null
    recentFollows: number | null
    followedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    username: string | null
    read: boolean | null
    followContent: string | null
    recentFollows: number | null
    followedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    username: number
    read: number
    followContent: number
    followNots: number
    recentFollows: number
    followedAt: number
    buy: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    recentFollows?: true
  }

  export type NotificationSumAggregateInputType = {
    recentFollows?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    username?: true
    read?: true
    followContent?: true
    recentFollows?: true
    followedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    username?: true
    read?: true
    followContent?: true
    recentFollows?: true
    followedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    username?: true
    read?: true
    followContent?: true
    followNots?: true
    recentFollows?: true
    followedAt?: true
    buy?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    username: string
    read: boolean
    followContent: string
    followNots: string[]
    recentFollows: number
    followedAt: Date
    buy: string[]
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    read?: boolean
    followContent?: boolean
    followNots?: boolean
    recentFollows?: boolean
    followedAt?: boolean
    tip?: boolean | TipEntryDefaultArgs<ExtArgs>
    buy?: boolean
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    username?: boolean
    read?: boolean
    followContent?: boolean
    followNots?: boolean
    recentFollows?: boolean
    followedAt?: boolean
    buy?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "read" | "followContent" | "followNots" | "recentFollows" | "followedAt" | "tip" | "buy", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      read: boolean
      followContent: string
      followNots: string[]
      recentFollows: number
      followedAt: Date
      buy: string[]
    }, ExtArgs["result"]["notification"]>
    composites: {
      tip: Prisma.$TipEntryPayload[]
    }
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * @param {NotificationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notification = await prisma.notification.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NotificationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Notification.
     * @param {NotificationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notification = await prisma.notification.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NotificationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly username: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly followContent: FieldRef<"Notification", 'String'>
    readonly followNots: FieldRef<"Notification", 'String[]'>
    readonly recentFollows: FieldRef<"Notification", 'Int'>
    readonly followedAt: FieldRef<"Notification", 'DateTime'>
    readonly buy: FieldRef<"Notification", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification findRaw
   */
  export type NotificationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification aggregateRaw
   */
  export type NotificationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model TipTxs
   */

  export type AggregateTipTxs = {
    _count: TipTxsCountAggregateOutputType | null
    _avg: TipTxsAvgAggregateOutputType | null
    _sum: TipTxsSumAggregateOutputType | null
    _min: TipTxsMinAggregateOutputType | null
    _max: TipTxsMaxAggregateOutputType | null
  }

  export type TipTxsAvgAggregateOutputType = {
    USDC: number | null
    ETH: number | null
    FLAY: number | null
    BNKR: number | null
    ZORA: number | null
    DEGEN: number | null
    tx: number | null
  }

  export type TipTxsSumAggregateOutputType = {
    USDC: number | null
    ETH: number | null
    FLAY: number | null
    BNKR: number | null
    ZORA: number | null
    DEGEN: number | null
    tx: number | null
  }

  export type TipTxsMinAggregateOutputType = {
    id: string | null
    username: string | null
    USDC: number | null
    ETH: number | null
    FLAY: number | null
    BNKR: number | null
    ZORA: number | null
    DEGEN: number | null
    tx: number | null
  }

  export type TipTxsMaxAggregateOutputType = {
    id: string | null
    username: string | null
    USDC: number | null
    ETH: number | null
    FLAY: number | null
    BNKR: number | null
    ZORA: number | null
    DEGEN: number | null
    tx: number | null
  }

  export type TipTxsCountAggregateOutputType = {
    id: number
    username: number
    USDC: number
    ETH: number
    FLAY: number
    BNKR: number
    ZORA: number
    DEGEN: number
    tx: number
    _all: number
  }


  export type TipTxsAvgAggregateInputType = {
    USDC?: true
    ETH?: true
    FLAY?: true
    BNKR?: true
    ZORA?: true
    DEGEN?: true
    tx?: true
  }

  export type TipTxsSumAggregateInputType = {
    USDC?: true
    ETH?: true
    FLAY?: true
    BNKR?: true
    ZORA?: true
    DEGEN?: true
    tx?: true
  }

  export type TipTxsMinAggregateInputType = {
    id?: true
    username?: true
    USDC?: true
    ETH?: true
    FLAY?: true
    BNKR?: true
    ZORA?: true
    DEGEN?: true
    tx?: true
  }

  export type TipTxsMaxAggregateInputType = {
    id?: true
    username?: true
    USDC?: true
    ETH?: true
    FLAY?: true
    BNKR?: true
    ZORA?: true
    DEGEN?: true
    tx?: true
  }

  export type TipTxsCountAggregateInputType = {
    id?: true
    username?: true
    USDC?: true
    ETH?: true
    FLAY?: true
    BNKR?: true
    ZORA?: true
    DEGEN?: true
    tx?: true
    _all?: true
  }

  export type TipTxsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipTxs to aggregate.
     */
    where?: TipTxsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipTxs to fetch.
     */
    orderBy?: TipTxsOrderByWithRelationInput | TipTxsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TipTxsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipTxs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipTxs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TipTxs
    **/
    _count?: true | TipTxsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TipTxsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TipTxsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipTxsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipTxsMaxAggregateInputType
  }

  export type GetTipTxsAggregateType<T extends TipTxsAggregateArgs> = {
        [P in keyof T & keyof AggregateTipTxs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipTxs[P]>
      : GetScalarType<T[P], AggregateTipTxs[P]>
  }




  export type TipTxsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TipTxsWhereInput
    orderBy?: TipTxsOrderByWithAggregationInput | TipTxsOrderByWithAggregationInput[]
    by: TipTxsScalarFieldEnum[] | TipTxsScalarFieldEnum
    having?: TipTxsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipTxsCountAggregateInputType | true
    _avg?: TipTxsAvgAggregateInputType
    _sum?: TipTxsSumAggregateInputType
    _min?: TipTxsMinAggregateInputType
    _max?: TipTxsMaxAggregateInputType
  }

  export type TipTxsGroupByOutputType = {
    id: string
    username: string
    USDC: number
    ETH: number
    FLAY: number
    BNKR: number
    ZORA: number
    DEGEN: number
    tx: number
    _count: TipTxsCountAggregateOutputType | null
    _avg: TipTxsAvgAggregateOutputType | null
    _sum: TipTxsSumAggregateOutputType | null
    _min: TipTxsMinAggregateOutputType | null
    _max: TipTxsMaxAggregateOutputType | null
  }

  type GetTipTxsGroupByPayload<T extends TipTxsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipTxsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipTxsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipTxsGroupByOutputType[P]>
            : GetScalarType<T[P], TipTxsGroupByOutputType[P]>
        }
      >
    >


  export type TipTxsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    USDC?: boolean
    ETH?: boolean
    FLAY?: boolean
    BNKR?: boolean
    ZORA?: boolean
    DEGEN?: boolean
    tx?: boolean
  }, ExtArgs["result"]["tipTxs"]>



  export type TipTxsSelectScalar = {
    id?: boolean
    username?: boolean
    USDC?: boolean
    ETH?: boolean
    FLAY?: boolean
    BNKR?: boolean
    ZORA?: boolean
    DEGEN?: boolean
    tx?: boolean
  }

  export type TipTxsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "USDC" | "ETH" | "FLAY" | "BNKR" | "ZORA" | "DEGEN" | "tx", ExtArgs["result"]["tipTxs"]>

  export type $TipTxsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TipTxs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      USDC: number
      ETH: number
      FLAY: number
      BNKR: number
      ZORA: number
      DEGEN: number
      tx: number
    }, ExtArgs["result"]["tipTxs"]>
    composites: {}
  }

  type TipTxsGetPayload<S extends boolean | null | undefined | TipTxsDefaultArgs> = $Result.GetResult<Prisma.$TipTxsPayload, S>

  type TipTxsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TipTxsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TipTxsCountAggregateInputType | true
    }

  export interface TipTxsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TipTxs'], meta: { name: 'TipTxs' } }
    /**
     * Find zero or one TipTxs that matches the filter.
     * @param {TipTxsFindUniqueArgs} args - Arguments to find a TipTxs
     * @example
     * // Get one TipTxs
     * const tipTxs = await prisma.tipTxs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TipTxsFindUniqueArgs>(args: SelectSubset<T, TipTxsFindUniqueArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TipTxs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TipTxsFindUniqueOrThrowArgs} args - Arguments to find a TipTxs
     * @example
     * // Get one TipTxs
     * const tipTxs = await prisma.tipTxs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TipTxsFindUniqueOrThrowArgs>(args: SelectSubset<T, TipTxsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TipTxs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsFindFirstArgs} args - Arguments to find a TipTxs
     * @example
     * // Get one TipTxs
     * const tipTxs = await prisma.tipTxs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TipTxsFindFirstArgs>(args?: SelectSubset<T, TipTxsFindFirstArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TipTxs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsFindFirstOrThrowArgs} args - Arguments to find a TipTxs
     * @example
     * // Get one TipTxs
     * const tipTxs = await prisma.tipTxs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TipTxsFindFirstOrThrowArgs>(args?: SelectSubset<T, TipTxsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TipTxs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TipTxs
     * const tipTxs = await prisma.tipTxs.findMany()
     * 
     * // Get first 10 TipTxs
     * const tipTxs = await prisma.tipTxs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipTxsWithIdOnly = await prisma.tipTxs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TipTxsFindManyArgs>(args?: SelectSubset<T, TipTxsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TipTxs.
     * @param {TipTxsCreateArgs} args - Arguments to create a TipTxs.
     * @example
     * // Create one TipTxs
     * const TipTxs = await prisma.tipTxs.create({
     *   data: {
     *     // ... data to create a TipTxs
     *   }
     * })
     * 
     */
    create<T extends TipTxsCreateArgs>(args: SelectSubset<T, TipTxsCreateArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TipTxs.
     * @param {TipTxsCreateManyArgs} args - Arguments to create many TipTxs.
     * @example
     * // Create many TipTxs
     * const tipTxs = await prisma.tipTxs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TipTxsCreateManyArgs>(args?: SelectSubset<T, TipTxsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TipTxs.
     * @param {TipTxsDeleteArgs} args - Arguments to delete one TipTxs.
     * @example
     * // Delete one TipTxs
     * const TipTxs = await prisma.tipTxs.delete({
     *   where: {
     *     // ... filter to delete one TipTxs
     *   }
     * })
     * 
     */
    delete<T extends TipTxsDeleteArgs>(args: SelectSubset<T, TipTxsDeleteArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TipTxs.
     * @param {TipTxsUpdateArgs} args - Arguments to update one TipTxs.
     * @example
     * // Update one TipTxs
     * const tipTxs = await prisma.tipTxs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TipTxsUpdateArgs>(args: SelectSubset<T, TipTxsUpdateArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TipTxs.
     * @param {TipTxsDeleteManyArgs} args - Arguments to filter TipTxs to delete.
     * @example
     * // Delete a few TipTxs
     * const { count } = await prisma.tipTxs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TipTxsDeleteManyArgs>(args?: SelectSubset<T, TipTxsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipTxs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TipTxs
     * const tipTxs = await prisma.tipTxs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TipTxsUpdateManyArgs>(args: SelectSubset<T, TipTxsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TipTxs.
     * @param {TipTxsUpsertArgs} args - Arguments to update or create a TipTxs.
     * @example
     * // Update or create a TipTxs
     * const tipTxs = await prisma.tipTxs.upsert({
     *   create: {
     *     // ... data to create a TipTxs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TipTxs we want to update
     *   }
     * })
     */
    upsert<T extends TipTxsUpsertArgs>(args: SelectSubset<T, TipTxsUpsertArgs<ExtArgs>>): Prisma__TipTxsClient<$Result.GetResult<Prisma.$TipTxsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TipTxs that matches the filter.
     * @param {TipTxsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const tipTxs = await prisma.tipTxs.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TipTxsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a TipTxs.
     * @param {TipTxsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const tipTxs = await prisma.tipTxs.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TipTxsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of TipTxs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsCountArgs} args - Arguments to filter TipTxs to count.
     * @example
     * // Count the number of TipTxs
     * const count = await prisma.tipTxs.count({
     *   where: {
     *     // ... the filter for the TipTxs we want to count
     *   }
     * })
    **/
    count<T extends TipTxsCountArgs>(
      args?: Subset<T, TipTxsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipTxsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TipTxs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipTxsAggregateArgs>(args: Subset<T, TipTxsAggregateArgs>): Prisma.PrismaPromise<GetTipTxsAggregateType<T>>

    /**
     * Group by TipTxs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipTxsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipTxsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipTxsGroupByArgs['orderBy'] }
        : { orderBy?: TipTxsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipTxsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipTxsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TipTxs model
   */
  readonly fields: TipTxsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TipTxs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TipTxsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TipTxs model
   */
  interface TipTxsFieldRefs {
    readonly id: FieldRef<"TipTxs", 'String'>
    readonly username: FieldRef<"TipTxs", 'String'>
    readonly USDC: FieldRef<"TipTxs", 'Float'>
    readonly ETH: FieldRef<"TipTxs", 'Float'>
    readonly FLAY: FieldRef<"TipTxs", 'Float'>
    readonly BNKR: FieldRef<"TipTxs", 'Float'>
    readonly ZORA: FieldRef<"TipTxs", 'Float'>
    readonly DEGEN: FieldRef<"TipTxs", 'Float'>
    readonly tx: FieldRef<"TipTxs", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TipTxs findUnique
   */
  export type TipTxsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter, which TipTxs to fetch.
     */
    where: TipTxsWhereUniqueInput
  }

  /**
   * TipTxs findUniqueOrThrow
   */
  export type TipTxsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter, which TipTxs to fetch.
     */
    where: TipTxsWhereUniqueInput
  }

  /**
   * TipTxs findFirst
   */
  export type TipTxsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter, which TipTxs to fetch.
     */
    where?: TipTxsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipTxs to fetch.
     */
    orderBy?: TipTxsOrderByWithRelationInput | TipTxsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipTxs.
     */
    cursor?: TipTxsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipTxs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipTxs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipTxs.
     */
    distinct?: TipTxsScalarFieldEnum | TipTxsScalarFieldEnum[]
  }

  /**
   * TipTxs findFirstOrThrow
   */
  export type TipTxsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter, which TipTxs to fetch.
     */
    where?: TipTxsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipTxs to fetch.
     */
    orderBy?: TipTxsOrderByWithRelationInput | TipTxsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipTxs.
     */
    cursor?: TipTxsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipTxs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipTxs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipTxs.
     */
    distinct?: TipTxsScalarFieldEnum | TipTxsScalarFieldEnum[]
  }

  /**
   * TipTxs findMany
   */
  export type TipTxsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter, which TipTxs to fetch.
     */
    where?: TipTxsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipTxs to fetch.
     */
    orderBy?: TipTxsOrderByWithRelationInput | TipTxsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TipTxs.
     */
    cursor?: TipTxsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipTxs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipTxs.
     */
    skip?: number
    distinct?: TipTxsScalarFieldEnum | TipTxsScalarFieldEnum[]
  }

  /**
   * TipTxs create
   */
  export type TipTxsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * The data needed to create a TipTxs.
     */
    data?: XOR<TipTxsCreateInput, TipTxsUncheckedCreateInput>
  }

  /**
   * TipTxs createMany
   */
  export type TipTxsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TipTxs.
     */
    data: TipTxsCreateManyInput | TipTxsCreateManyInput[]
  }

  /**
   * TipTxs update
   */
  export type TipTxsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * The data needed to update a TipTxs.
     */
    data: XOR<TipTxsUpdateInput, TipTxsUncheckedUpdateInput>
    /**
     * Choose, which TipTxs to update.
     */
    where: TipTxsWhereUniqueInput
  }

  /**
   * TipTxs updateMany
   */
  export type TipTxsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TipTxs.
     */
    data: XOR<TipTxsUpdateManyMutationInput, TipTxsUncheckedUpdateManyInput>
    /**
     * Filter which TipTxs to update
     */
    where?: TipTxsWhereInput
    /**
     * Limit how many TipTxs to update.
     */
    limit?: number
  }

  /**
   * TipTxs upsert
   */
  export type TipTxsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * The filter to search for the TipTxs to update in case it exists.
     */
    where: TipTxsWhereUniqueInput
    /**
     * In case the TipTxs found by the `where` argument doesn't exist, create a new TipTxs with this data.
     */
    create: XOR<TipTxsCreateInput, TipTxsUncheckedCreateInput>
    /**
     * In case the TipTxs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TipTxsUpdateInput, TipTxsUncheckedUpdateInput>
  }

  /**
   * TipTxs delete
   */
  export type TipTxsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
    /**
     * Filter which TipTxs to delete.
     */
    where: TipTxsWhereUniqueInput
  }

  /**
   * TipTxs deleteMany
   */
  export type TipTxsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipTxs to delete
     */
    where?: TipTxsWhereInput
    /**
     * Limit how many TipTxs to delete.
     */
    limit?: number
  }

  /**
   * TipTxs findRaw
   */
  export type TipTxsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TipTxs aggregateRaw
   */
  export type TipTxsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * TipTxs without action
   */
  export type TipTxsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipTxs
     */
    select?: TipTxsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TipTxs
     */
    omit?: TipTxsOmit<ExtArgs> | null
  }


  /**
   * Model cVolume
   */

  export type AggregateCVolume = {
    _count: CVolumeCountAggregateOutputType | null
    _avg: CVolumeAvgAggregateOutputType | null
    _sum: CVolumeSumAggregateOutputType | null
    _min: CVolumeMinAggregateOutputType | null
    _max: CVolumeMaxAggregateOutputType | null
  }

  export type CVolumeAvgAggregateOutputType = {
    volume: number | null
  }

  export type CVolumeSumAggregateOutputType = {
    volume: number | null
  }

  export type CVolumeMinAggregateOutputType = {
    id: string | null
    volume: number | null
    username: string | null
  }

  export type CVolumeMaxAggregateOutputType = {
    id: string | null
    volume: number | null
    username: string | null
  }

  export type CVolumeCountAggregateOutputType = {
    id: number
    volume: number
    username: number
    _all: number
  }


  export type CVolumeAvgAggregateInputType = {
    volume?: true
  }

  export type CVolumeSumAggregateInputType = {
    volume?: true
  }

  export type CVolumeMinAggregateInputType = {
    id?: true
    volume?: true
    username?: true
  }

  export type CVolumeMaxAggregateInputType = {
    id?: true
    volume?: true
    username?: true
  }

  export type CVolumeCountAggregateInputType = {
    id?: true
    volume?: true
    username?: true
    _all?: true
  }

  export type CVolumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cVolume to aggregate.
     */
    where?: cVolumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cVolumes to fetch.
     */
    orderBy?: cVolumeOrderByWithRelationInput | cVolumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cVolumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cVolumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cVolumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cVolumes
    **/
    _count?: true | CVolumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CVolumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CVolumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CVolumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CVolumeMaxAggregateInputType
  }

  export type GetCVolumeAggregateType<T extends CVolumeAggregateArgs> = {
        [P in keyof T & keyof AggregateCVolume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCVolume[P]>
      : GetScalarType<T[P], AggregateCVolume[P]>
  }




  export type cVolumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cVolumeWhereInput
    orderBy?: cVolumeOrderByWithAggregationInput | cVolumeOrderByWithAggregationInput[]
    by: CVolumeScalarFieldEnum[] | CVolumeScalarFieldEnum
    having?: cVolumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CVolumeCountAggregateInputType | true
    _avg?: CVolumeAvgAggregateInputType
    _sum?: CVolumeSumAggregateInputType
    _min?: CVolumeMinAggregateInputType
    _max?: CVolumeMaxAggregateInputType
  }

  export type CVolumeGroupByOutputType = {
    id: string
    volume: number
    username: string
    _count: CVolumeCountAggregateOutputType | null
    _avg: CVolumeAvgAggregateOutputType | null
    _sum: CVolumeSumAggregateOutputType | null
    _min: CVolumeMinAggregateOutputType | null
    _max: CVolumeMaxAggregateOutputType | null
  }

  type GetCVolumeGroupByPayload<T extends cVolumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CVolumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CVolumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CVolumeGroupByOutputType[P]>
            : GetScalarType<T[P], CVolumeGroupByOutputType[P]>
        }
      >
    >


  export type cVolumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    volume?: boolean
    username?: boolean
  }, ExtArgs["result"]["cVolume"]>



  export type cVolumeSelectScalar = {
    id?: boolean
    volume?: boolean
    username?: boolean
  }

  export type cVolumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "volume" | "username", ExtArgs["result"]["cVolume"]>

  export type $cVolumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cVolume"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      volume: number
      username: string
    }, ExtArgs["result"]["cVolume"]>
    composites: {}
  }

  type cVolumeGetPayload<S extends boolean | null | undefined | cVolumeDefaultArgs> = $Result.GetResult<Prisma.$cVolumePayload, S>

  type cVolumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cVolumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CVolumeCountAggregateInputType | true
    }

  export interface cVolumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cVolume'], meta: { name: 'cVolume' } }
    /**
     * Find zero or one CVolume that matches the filter.
     * @param {cVolumeFindUniqueArgs} args - Arguments to find a CVolume
     * @example
     * // Get one CVolume
     * const cVolume = await prisma.cVolume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cVolumeFindUniqueArgs>(args: SelectSubset<T, cVolumeFindUniqueArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CVolume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cVolumeFindUniqueOrThrowArgs} args - Arguments to find a CVolume
     * @example
     * // Get one CVolume
     * const cVolume = await prisma.cVolume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cVolumeFindUniqueOrThrowArgs>(args: SelectSubset<T, cVolumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CVolume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeFindFirstArgs} args - Arguments to find a CVolume
     * @example
     * // Get one CVolume
     * const cVolume = await prisma.cVolume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cVolumeFindFirstArgs>(args?: SelectSubset<T, cVolumeFindFirstArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CVolume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeFindFirstOrThrowArgs} args - Arguments to find a CVolume
     * @example
     * // Get one CVolume
     * const cVolume = await prisma.cVolume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cVolumeFindFirstOrThrowArgs>(args?: SelectSubset<T, cVolumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CVolumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CVolumes
     * const cVolumes = await prisma.cVolume.findMany()
     * 
     * // Get first 10 CVolumes
     * const cVolumes = await prisma.cVolume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cVolumeWithIdOnly = await prisma.cVolume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cVolumeFindManyArgs>(args?: SelectSubset<T, cVolumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CVolume.
     * @param {cVolumeCreateArgs} args - Arguments to create a CVolume.
     * @example
     * // Create one CVolume
     * const CVolume = await prisma.cVolume.create({
     *   data: {
     *     // ... data to create a CVolume
     *   }
     * })
     * 
     */
    create<T extends cVolumeCreateArgs>(args: SelectSubset<T, cVolumeCreateArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CVolumes.
     * @param {cVolumeCreateManyArgs} args - Arguments to create many CVolumes.
     * @example
     * // Create many CVolumes
     * const cVolume = await prisma.cVolume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cVolumeCreateManyArgs>(args?: SelectSubset<T, cVolumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CVolume.
     * @param {cVolumeDeleteArgs} args - Arguments to delete one CVolume.
     * @example
     * // Delete one CVolume
     * const CVolume = await prisma.cVolume.delete({
     *   where: {
     *     // ... filter to delete one CVolume
     *   }
     * })
     * 
     */
    delete<T extends cVolumeDeleteArgs>(args: SelectSubset<T, cVolumeDeleteArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CVolume.
     * @param {cVolumeUpdateArgs} args - Arguments to update one CVolume.
     * @example
     * // Update one CVolume
     * const cVolume = await prisma.cVolume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cVolumeUpdateArgs>(args: SelectSubset<T, cVolumeUpdateArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CVolumes.
     * @param {cVolumeDeleteManyArgs} args - Arguments to filter CVolumes to delete.
     * @example
     * // Delete a few CVolumes
     * const { count } = await prisma.cVolume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cVolumeDeleteManyArgs>(args?: SelectSubset<T, cVolumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CVolumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CVolumes
     * const cVolume = await prisma.cVolume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cVolumeUpdateManyArgs>(args: SelectSubset<T, cVolumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CVolume.
     * @param {cVolumeUpsertArgs} args - Arguments to update or create a CVolume.
     * @example
     * // Update or create a CVolume
     * const cVolume = await prisma.cVolume.upsert({
     *   create: {
     *     // ... data to create a CVolume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CVolume we want to update
     *   }
     * })
     */
    upsert<T extends cVolumeUpsertArgs>(args: SelectSubset<T, cVolumeUpsertArgs<ExtArgs>>): Prisma__cVolumeClient<$Result.GetResult<Prisma.$cVolumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CVolumes that matches the filter.
     * @param {cVolumeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const cVolume = await prisma.cVolume.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: cVolumeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CVolume.
     * @param {cVolumeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const cVolume = await prisma.cVolume.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: cVolumeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CVolumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeCountArgs} args - Arguments to filter CVolumes to count.
     * @example
     * // Count the number of CVolumes
     * const count = await prisma.cVolume.count({
     *   where: {
     *     // ... the filter for the CVolumes we want to count
     *   }
     * })
    **/
    count<T extends cVolumeCountArgs>(
      args?: Subset<T, cVolumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CVolumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CVolume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CVolumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CVolumeAggregateArgs>(args: Subset<T, CVolumeAggregateArgs>): Prisma.PrismaPromise<GetCVolumeAggregateType<T>>

    /**
     * Group by CVolume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cVolumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cVolumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cVolumeGroupByArgs['orderBy'] }
        : { orderBy?: cVolumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cVolumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCVolumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cVolume model
   */
  readonly fields: cVolumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cVolume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cVolumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cVolume model
   */
  interface cVolumeFieldRefs {
    readonly id: FieldRef<"cVolume", 'String'>
    readonly volume: FieldRef<"cVolume", 'Int'>
    readonly username: FieldRef<"cVolume", 'String'>
  }
    

  // Custom InputTypes
  /**
   * cVolume findUnique
   */
  export type cVolumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter, which cVolume to fetch.
     */
    where: cVolumeWhereUniqueInput
  }

  /**
   * cVolume findUniqueOrThrow
   */
  export type cVolumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter, which cVolume to fetch.
     */
    where: cVolumeWhereUniqueInput
  }

  /**
   * cVolume findFirst
   */
  export type cVolumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter, which cVolume to fetch.
     */
    where?: cVolumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cVolumes to fetch.
     */
    orderBy?: cVolumeOrderByWithRelationInput | cVolumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cVolumes.
     */
    cursor?: cVolumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cVolumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cVolumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cVolumes.
     */
    distinct?: CVolumeScalarFieldEnum | CVolumeScalarFieldEnum[]
  }

  /**
   * cVolume findFirstOrThrow
   */
  export type cVolumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter, which cVolume to fetch.
     */
    where?: cVolumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cVolumes to fetch.
     */
    orderBy?: cVolumeOrderByWithRelationInput | cVolumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cVolumes.
     */
    cursor?: cVolumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cVolumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cVolumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cVolumes.
     */
    distinct?: CVolumeScalarFieldEnum | CVolumeScalarFieldEnum[]
  }

  /**
   * cVolume findMany
   */
  export type cVolumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter, which cVolumes to fetch.
     */
    where?: cVolumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cVolumes to fetch.
     */
    orderBy?: cVolumeOrderByWithRelationInput | cVolumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cVolumes.
     */
    cursor?: cVolumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cVolumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cVolumes.
     */
    skip?: number
    distinct?: CVolumeScalarFieldEnum | CVolumeScalarFieldEnum[]
  }

  /**
   * cVolume create
   */
  export type cVolumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * The data needed to create a cVolume.
     */
    data: XOR<cVolumeCreateInput, cVolumeUncheckedCreateInput>
  }

  /**
   * cVolume createMany
   */
  export type cVolumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cVolumes.
     */
    data: cVolumeCreateManyInput | cVolumeCreateManyInput[]
  }

  /**
   * cVolume update
   */
  export type cVolumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * The data needed to update a cVolume.
     */
    data: XOR<cVolumeUpdateInput, cVolumeUncheckedUpdateInput>
    /**
     * Choose, which cVolume to update.
     */
    where: cVolumeWhereUniqueInput
  }

  /**
   * cVolume updateMany
   */
  export type cVolumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cVolumes.
     */
    data: XOR<cVolumeUpdateManyMutationInput, cVolumeUncheckedUpdateManyInput>
    /**
     * Filter which cVolumes to update
     */
    where?: cVolumeWhereInput
    /**
     * Limit how many cVolumes to update.
     */
    limit?: number
  }

  /**
   * cVolume upsert
   */
  export type cVolumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * The filter to search for the cVolume to update in case it exists.
     */
    where: cVolumeWhereUniqueInput
    /**
     * In case the cVolume found by the `where` argument doesn't exist, create a new cVolume with this data.
     */
    create: XOR<cVolumeCreateInput, cVolumeUncheckedCreateInput>
    /**
     * In case the cVolume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cVolumeUpdateInput, cVolumeUncheckedUpdateInput>
  }

  /**
   * cVolume delete
   */
  export type cVolumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
    /**
     * Filter which cVolume to delete.
     */
    where: cVolumeWhereUniqueInput
  }

  /**
   * cVolume deleteMany
   */
  export type cVolumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cVolumes to delete
     */
    where?: cVolumeWhereInput
    /**
     * Limit how many cVolumes to delete.
     */
    limit?: number
  }

  /**
   * cVolume findRaw
   */
  export type cVolumeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * cVolume aggregateRaw
   */
  export type cVolumeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * cVolume without action
   */
  export type cVolumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cVolume
     */
    select?: cVolumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cVolume
     */
    omit?: cVolumeOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    tokenPrice: number | null
    totalStreams: number | null
    epicStreams: number | null
    totalFees: number | null
  }

  export type UserSumAggregateOutputType = {
    tokenPrice: number | null
    totalStreams: number | null
    epicStreams: number | null
    totalFees: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    privyId: string | null
    username: string | null
    email: string | null
    userPfp: string | null
    walletAddress: string | null
    sa_address: string | null
    tokenPrice: number | null
    totalStreams: number | null
    bio: string | null
    epicStreams: number | null
    totalFees: number | null
    claimDate: Date | null
    emailVerified: boolean | null
    role: $Enums.StreamerRole | null
    tokenImage: string | null
    xUrl: string | null
    ytUrl: string | null
    creatorToken: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    privyId: string | null
    username: string | null
    email: string | null
    userPfp: string | null
    walletAddress: string | null
    sa_address: string | null
    tokenPrice: number | null
    totalStreams: number | null
    bio: string | null
    epicStreams: number | null
    totalFees: number | null
    claimDate: Date | null
    emailVerified: boolean | null
    role: $Enums.StreamerRole | null
    tokenImage: string | null
    xUrl: string | null
    ytUrl: string | null
    creatorToken: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    privyId: number
    username: number
    email: number
    userPfp: number
    walletAddress: number
    sa_address: number
    tokenPrice: number
    totalStreams: number
    bio: number
    epicStreams: number
    totalFees: number
    claimDate: number
    emailVerified: number
    role: number
    tokenImage: number
    xUrl: number
    ytUrl: number
    followers: number
    following: number
    creatorToken: number
    holdings: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    tokenPrice?: true
    totalStreams?: true
    epicStreams?: true
    totalFees?: true
  }

  export type UserSumAggregateInputType = {
    tokenPrice?: true
    totalStreams?: true
    epicStreams?: true
    totalFees?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    privyId?: true
    username?: true
    email?: true
    userPfp?: true
    walletAddress?: true
    sa_address?: true
    tokenPrice?: true
    totalStreams?: true
    bio?: true
    epicStreams?: true
    totalFees?: true
    claimDate?: true
    emailVerified?: true
    role?: true
    tokenImage?: true
    xUrl?: true
    ytUrl?: true
    creatorToken?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    privyId?: true
    username?: true
    email?: true
    userPfp?: true
    walletAddress?: true
    sa_address?: true
    tokenPrice?: true
    totalStreams?: true
    bio?: true
    epicStreams?: true
    totalFees?: true
    claimDate?: true
    emailVerified?: true
    role?: true
    tokenImage?: true
    xUrl?: true
    ytUrl?: true
    creatorToken?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    privyId?: true
    username?: true
    email?: true
    userPfp?: true
    walletAddress?: true
    sa_address?: true
    tokenPrice?: true
    totalStreams?: true
    bio?: true
    epicStreams?: true
    totalFees?: true
    claimDate?: true
    emailVerified?: true
    role?: true
    tokenImage?: true
    xUrl?: true
    ytUrl?: true
    followers?: true
    following?: true
    creatorToken?: true
    holdings?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    privyId: string
    username: string
    email: string
    userPfp: string
    walletAddress: string
    sa_address: string | null
    tokenPrice: number
    totalStreams: number
    bio: string
    epicStreams: number
    totalFees: number
    claimDate: Date | null
    emailVerified: boolean
    role: $Enums.StreamerRole
    tokenImage: string | null
    xUrl: string | null
    ytUrl: string | null
    followers: string[]
    following: string[]
    creatorToken: string | null
    holdings: string[]
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    privyId?: boolean
    username?: boolean
    email?: boolean
    userPfp?: boolean
    walletAddress?: boolean
    sa_address?: boolean
    tokenPrice?: boolean
    totalStreams?: boolean
    bio?: boolean
    epicStreams?: boolean
    totalFees?: boolean
    claimDate?: boolean
    emailVerified?: boolean
    role?: boolean
    tokenImage?: boolean
    xUrl?: boolean
    ytUrl?: boolean
    followers?: boolean
    following?: boolean
    creatorToken?: boolean
    holdings?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    privyId?: boolean
    username?: boolean
    email?: boolean
    userPfp?: boolean
    walletAddress?: boolean
    sa_address?: boolean
    tokenPrice?: boolean
    totalStreams?: boolean
    bio?: boolean
    epicStreams?: boolean
    totalFees?: boolean
    claimDate?: boolean
    emailVerified?: boolean
    role?: boolean
    tokenImage?: boolean
    xUrl?: boolean
    ytUrl?: boolean
    followers?: boolean
    following?: boolean
    creatorToken?: boolean
    holdings?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "privyId" | "username" | "email" | "userPfp" | "walletAddress" | "sa_address" | "tokenPrice" | "totalStreams" | "bio" | "epicStreams" | "totalFees" | "claimDate" | "emailVerified" | "role" | "tokenImage" | "xUrl" | "ytUrl" | "followers" | "following" | "creatorToken" | "holdings", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      privyId: string
      username: string
      email: string
      userPfp: string
      walletAddress: string
      sa_address: string | null
      tokenPrice: number
      totalStreams: number
      bio: string
      epicStreams: number
      totalFees: number
      claimDate: Date | null
      emailVerified: boolean
      role: $Enums.StreamerRole
      tokenImage: string | null
      xUrl: string | null
      ytUrl: string | null
      followers: string[]
      following: string[]
      creatorToken: string | null
      holdings: string[]
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly privyId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly userPfp: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly sa_address: FieldRef<"User", 'String'>
    readonly tokenPrice: FieldRef<"User", 'Float'>
    readonly totalStreams: FieldRef<"User", 'Int'>
    readonly bio: FieldRef<"User", 'String'>
    readonly epicStreams: FieldRef<"User", 'Int'>
    readonly totalFees: FieldRef<"User", 'Float'>
    readonly claimDate: FieldRef<"User", 'DateTime'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'StreamerRole'>
    readonly tokenImage: FieldRef<"User", 'String'>
    readonly xUrl: FieldRef<"User", 'String'>
    readonly ytUrl: FieldRef<"User", 'String'>
    readonly followers: FieldRef<"User", 'String[]'>
    readonly following: FieldRef<"User", 'String[]'>
    readonly creatorToken: FieldRef<"User", 'String'>
    readonly holdings: FieldRef<"User", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const StreamScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    title: 'title',
    date: 'date',
    creatorToken: 'creatorToken',
    viewers: 'viewers',
    pfp: 'pfp',
    thumbnail: 'thumbnail',
    status: 'status',
    streamer: 'streamer'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    username: 'username',
    read: 'read',
    followContent: 'followContent',
    followNots: 'followNots',
    recentFollows: 'recentFollows',
    followedAt: 'followedAt',
    buy: 'buy'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const TipTxsScalarFieldEnum: {
    id: 'id',
    username: 'username',
    USDC: 'USDC',
    ETH: 'ETH',
    FLAY: 'FLAY',
    BNKR: 'BNKR',
    ZORA: 'ZORA',
    DEGEN: 'DEGEN',
    tx: 'tx'
  };

  export type TipTxsScalarFieldEnum = (typeof TipTxsScalarFieldEnum)[keyof typeof TipTxsScalarFieldEnum]


  export const CVolumeScalarFieldEnum: {
    id: 'id',
    volume: 'volume',
    username: 'username'
  };

  export type CVolumeScalarFieldEnum = (typeof CVolumeScalarFieldEnum)[keyof typeof CVolumeScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    privyId: 'privyId',
    username: 'username',
    email: 'email',
    userPfp: 'userPfp',
    walletAddress: 'walletAddress',
    sa_address: 'sa_address',
    tokenPrice: 'tokenPrice',
    totalStreams: 'totalStreams',
    bio: 'bio',
    epicStreams: 'epicStreams',
    totalFees: 'totalFees',
    claimDate: 'claimDate',
    emailVerified: 'emailVerified',
    role: 'role',
    tokenImage: 'tokenImage',
    xUrl: 'xUrl',
    ytUrl: 'ytUrl',
    followers: 'followers',
    following: 'following',
    creatorToken: 'creatorToken',
    holdings: 'holdings'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StreamerRole'
   */
  export type EnumStreamerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamerRole'>
    


  /**
   * Reference to a field of type 'StreamerRole[]'
   */
  export type ListEnumStreamerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamerRole[]'>
    
  /**
   * Deep Input Types
   */


  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    roomId?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    date?: StringNullableFilter<"Stream"> | string | null
    creatorToken?: StringNullableFilter<"Stream"> | string | null
    viewers?: IntFilter<"Stream"> | number
    pfp?: StringFilter<"Stream"> | string
    thumbnail?: StringNullableFilter<"Stream"> | string | null
    status?: EnumStatusFilter<"Stream"> | $Enums.Status
    streamer?: StringFilter<"Stream"> | string
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    date?: SortOrder
    creatorToken?: SortOrder
    viewers?: SortOrder
    pfp?: SortOrder
    thumbnail?: SortOrder
    status?: SortOrder
    streamer?: SortOrder
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    title?: StringFilter<"Stream"> | string
    date?: StringNullableFilter<"Stream"> | string | null
    creatorToken?: StringNullableFilter<"Stream"> | string | null
    viewers?: IntFilter<"Stream"> | number
    pfp?: StringFilter<"Stream"> | string
    thumbnail?: StringNullableFilter<"Stream"> | string | null
    status?: EnumStatusFilter<"Stream"> | $Enums.Status
    streamer?: StringFilter<"Stream"> | string
  }, "id" | "roomId">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    date?: SortOrder
    creatorToken?: SortOrder
    viewers?: SortOrder
    pfp?: SortOrder
    thumbnail?: SortOrder
    status?: SortOrder
    streamer?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _avg?: StreamAvgOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
    _sum?: StreamSumOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    roomId?: StringWithAggregatesFilter<"Stream"> | string
    title?: StringWithAggregatesFilter<"Stream"> | string
    date?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    creatorToken?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    viewers?: IntWithAggregatesFilter<"Stream"> | number
    pfp?: StringWithAggregatesFilter<"Stream"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    status?: EnumStatusWithAggregatesFilter<"Stream"> | $Enums.Status
    streamer?: StringWithAggregatesFilter<"Stream"> | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    username?: StringFilter<"Notification"> | string
    read?: BoolFilter<"Notification"> | boolean
    followContent?: StringFilter<"Notification"> | string
    followNots?: StringNullableListFilter<"Notification">
    recentFollows?: IntFilter<"Notification"> | number
    followedAt?: DateTimeFilter<"Notification"> | Date | string
    tip?: TipEntryCompositeListFilter | TipEntryObjectEqualityInput[]
    buy?: StringNullableListFilter<"Notification">
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    read?: SortOrder
    followContent?: SortOrder
    followNots?: SortOrder
    recentFollows?: SortOrder
    followedAt?: SortOrder
    tip?: TipEntryOrderByCompositeAggregateInput
    buy?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    read?: BoolFilter<"Notification"> | boolean
    followContent?: StringFilter<"Notification"> | string
    followNots?: StringNullableListFilter<"Notification">
    recentFollows?: IntFilter<"Notification"> | number
    followedAt?: DateTimeFilter<"Notification"> | Date | string
    tip?: TipEntryCompositeListFilter | TipEntryObjectEqualityInput[]
    buy?: StringNullableListFilter<"Notification">
  }, "id" | "username">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    read?: SortOrder
    followContent?: SortOrder
    followNots?: SortOrder
    recentFollows?: SortOrder
    followedAt?: SortOrder
    buy?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    username?: StringWithAggregatesFilter<"Notification"> | string
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    followContent?: StringWithAggregatesFilter<"Notification"> | string
    followNots?: StringNullableListFilter<"Notification">
    recentFollows?: IntWithAggregatesFilter<"Notification"> | number
    followedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    buy?: StringNullableListFilter<"Notification">
  }

  export type TipTxsWhereInput = {
    AND?: TipTxsWhereInput | TipTxsWhereInput[]
    OR?: TipTxsWhereInput[]
    NOT?: TipTxsWhereInput | TipTxsWhereInput[]
    id?: StringFilter<"TipTxs"> | string
    username?: StringFilter<"TipTxs"> | string
    USDC?: FloatFilter<"TipTxs"> | number
    ETH?: FloatFilter<"TipTxs"> | number
    FLAY?: FloatFilter<"TipTxs"> | number
    BNKR?: FloatFilter<"TipTxs"> | number
    ZORA?: FloatFilter<"TipTxs"> | number
    DEGEN?: FloatFilter<"TipTxs"> | number
    tx?: IntFilter<"TipTxs"> | number
  }

  export type TipTxsOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type TipTxsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: TipTxsWhereInput | TipTxsWhereInput[]
    OR?: TipTxsWhereInput[]
    NOT?: TipTxsWhereInput | TipTxsWhereInput[]
    USDC?: FloatFilter<"TipTxs"> | number
    ETH?: FloatFilter<"TipTxs"> | number
    FLAY?: FloatFilter<"TipTxs"> | number
    BNKR?: FloatFilter<"TipTxs"> | number
    ZORA?: FloatFilter<"TipTxs"> | number
    DEGEN?: FloatFilter<"TipTxs"> | number
    tx?: IntFilter<"TipTxs"> | number
  }, "id" | "username">

  export type TipTxsOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
    _count?: TipTxsCountOrderByAggregateInput
    _avg?: TipTxsAvgOrderByAggregateInput
    _max?: TipTxsMaxOrderByAggregateInput
    _min?: TipTxsMinOrderByAggregateInput
    _sum?: TipTxsSumOrderByAggregateInput
  }

  export type TipTxsScalarWhereWithAggregatesInput = {
    AND?: TipTxsScalarWhereWithAggregatesInput | TipTxsScalarWhereWithAggregatesInput[]
    OR?: TipTxsScalarWhereWithAggregatesInput[]
    NOT?: TipTxsScalarWhereWithAggregatesInput | TipTxsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TipTxs"> | string
    username?: StringWithAggregatesFilter<"TipTxs"> | string
    USDC?: FloatWithAggregatesFilter<"TipTxs"> | number
    ETH?: FloatWithAggregatesFilter<"TipTxs"> | number
    FLAY?: FloatWithAggregatesFilter<"TipTxs"> | number
    BNKR?: FloatWithAggregatesFilter<"TipTxs"> | number
    ZORA?: FloatWithAggregatesFilter<"TipTxs"> | number
    DEGEN?: FloatWithAggregatesFilter<"TipTxs"> | number
    tx?: IntWithAggregatesFilter<"TipTxs"> | number
  }

  export type cVolumeWhereInput = {
    AND?: cVolumeWhereInput | cVolumeWhereInput[]
    OR?: cVolumeWhereInput[]
    NOT?: cVolumeWhereInput | cVolumeWhereInput[]
    id?: StringFilter<"cVolume"> | string
    volume?: IntFilter<"cVolume"> | number
    username?: StringFilter<"cVolume"> | string
  }

  export type cVolumeOrderByWithRelationInput = {
    id?: SortOrder
    volume?: SortOrder
    username?: SortOrder
  }

  export type cVolumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: cVolumeWhereInput | cVolumeWhereInput[]
    OR?: cVolumeWhereInput[]
    NOT?: cVolumeWhereInput | cVolumeWhereInput[]
    volume?: IntFilter<"cVolume"> | number
  }, "id" | "username">

  export type cVolumeOrderByWithAggregationInput = {
    id?: SortOrder
    volume?: SortOrder
    username?: SortOrder
    _count?: cVolumeCountOrderByAggregateInput
    _avg?: cVolumeAvgOrderByAggregateInput
    _max?: cVolumeMaxOrderByAggregateInput
    _min?: cVolumeMinOrderByAggregateInput
    _sum?: cVolumeSumOrderByAggregateInput
  }

  export type cVolumeScalarWhereWithAggregatesInput = {
    AND?: cVolumeScalarWhereWithAggregatesInput | cVolumeScalarWhereWithAggregatesInput[]
    OR?: cVolumeScalarWhereWithAggregatesInput[]
    NOT?: cVolumeScalarWhereWithAggregatesInput | cVolumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"cVolume"> | string
    volume?: IntWithAggregatesFilter<"cVolume"> | number
    username?: StringWithAggregatesFilter<"cVolume"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    privyId?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    userPfp?: StringFilter<"User"> | string
    walletAddress?: StringFilter<"User"> | string
    sa_address?: StringNullableFilter<"User"> | string | null
    tokenPrice?: FloatFilter<"User"> | number
    totalStreams?: IntFilter<"User"> | number
    bio?: StringFilter<"User"> | string
    epicStreams?: IntFilter<"User"> | number
    totalFees?: FloatFilter<"User"> | number
    claimDate?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    role?: EnumStreamerRoleFilter<"User"> | $Enums.StreamerRole
    tokenImage?: StringNullableFilter<"User"> | string | null
    xUrl?: StringNullableFilter<"User"> | string | null
    ytUrl?: StringNullableFilter<"User"> | string | null
    followers?: StringNullableListFilter<"User">
    following?: StringNullableListFilter<"User">
    creatorToken?: StringNullableFilter<"User"> | string | null
    holdings?: StringNullableListFilter<"User">
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    privyId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    userPfp?: SortOrder
    walletAddress?: SortOrder
    sa_address?: SortOrder
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    bio?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
    claimDate?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    tokenImage?: SortOrder
    xUrl?: SortOrder
    ytUrl?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    creatorToken?: SortOrder
    holdings?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    privyId?: string
    username?: string
    email?: string
    walletAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userPfp?: StringFilter<"User"> | string
    sa_address?: StringNullableFilter<"User"> | string | null
    tokenPrice?: FloatFilter<"User"> | number
    totalStreams?: IntFilter<"User"> | number
    bio?: StringFilter<"User"> | string
    epicStreams?: IntFilter<"User"> | number
    totalFees?: FloatFilter<"User"> | number
    claimDate?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    role?: EnumStreamerRoleFilter<"User"> | $Enums.StreamerRole
    tokenImage?: StringNullableFilter<"User"> | string | null
    xUrl?: StringNullableFilter<"User"> | string | null
    ytUrl?: StringNullableFilter<"User"> | string | null
    followers?: StringNullableListFilter<"User">
    following?: StringNullableListFilter<"User">
    creatorToken?: StringNullableFilter<"User"> | string | null
    holdings?: StringNullableListFilter<"User">
  }, "id" | "privyId" | "username" | "email" | "walletAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    privyId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    userPfp?: SortOrder
    walletAddress?: SortOrder
    sa_address?: SortOrder
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    bio?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
    claimDate?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    tokenImage?: SortOrder
    xUrl?: SortOrder
    ytUrl?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    creatorToken?: SortOrder
    holdings?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    privyId?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    userPfp?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    sa_address?: StringNullableWithAggregatesFilter<"User"> | string | null
    tokenPrice?: FloatWithAggregatesFilter<"User"> | number
    totalStreams?: IntWithAggregatesFilter<"User"> | number
    bio?: StringWithAggregatesFilter<"User"> | string
    epicStreams?: IntWithAggregatesFilter<"User"> | number
    totalFees?: FloatWithAggregatesFilter<"User"> | number
    claimDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumStreamerRoleWithAggregatesFilter<"User"> | $Enums.StreamerRole
    tokenImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    xUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    ytUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    followers?: StringNullableListFilter<"User">
    following?: StringNullableListFilter<"User">
    creatorToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    holdings?: StringNullableListFilter<"User">
  }

  export type StreamCreateInput = {
    id?: string
    roomId: string
    title: string
    date?: string | null
    creatorToken?: string | null
    viewers?: number
    pfp: string
    thumbnail?: string | null
    status: $Enums.Status
    streamer: string
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    roomId: string
    title: string
    date?: string | null
    creatorToken?: string | null
    viewers?: number
    pfp: string
    thumbnail?: string | null
    status: $Enums.Status
    streamer: string
  }

  export type StreamUpdateInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    viewers?: IntFieldUpdateOperationsInput | number
    pfp?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    streamer?: StringFieldUpdateOperationsInput | string
  }

  export type StreamUncheckedUpdateInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    viewers?: IntFieldUpdateOperationsInput | number
    pfp?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    streamer?: StringFieldUpdateOperationsInput | string
  }

  export type StreamCreateManyInput = {
    id?: string
    roomId: string
    title: string
    date?: string | null
    creatorToken?: string | null
    viewers?: number
    pfp: string
    thumbnail?: string | null
    status: $Enums.Status
    streamer: string
  }

  export type StreamUpdateManyMutationInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    viewers?: IntFieldUpdateOperationsInput | number
    pfp?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    streamer?: StringFieldUpdateOperationsInput | string
  }

  export type StreamUncheckedUpdateManyInput = {
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    viewers?: IntFieldUpdateOperationsInput | number
    pfp?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    streamer?: StringFieldUpdateOperationsInput | string
  }

  export type NotificationCreateInput = {
    id?: string
    username: string
    read?: boolean
    followContent?: string
    followNots?: NotificationCreatefollowNotsInput | string[]
    recentFollows?: number
    followedAt?: Date | string
    tip?: XOR<TipEntryListCreateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationCreatebuyInput | string[]
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    username: string
    read?: boolean
    followContent?: string
    followNots?: NotificationCreatefollowNotsInput | string[]
    recentFollows?: number
    followedAt?: Date | string
    tip?: XOR<TipEntryListCreateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationCreatebuyInput | string[]
  }

  export type NotificationUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    followContent?: StringFieldUpdateOperationsInput | string
    followNots?: NotificationUpdatefollowNotsInput | string[]
    recentFollows?: IntFieldUpdateOperationsInput | number
    followedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tip?: XOR<TipEntryListUpdateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationUpdatebuyInput | string[]
  }

  export type NotificationUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    followContent?: StringFieldUpdateOperationsInput | string
    followNots?: NotificationUpdatefollowNotsInput | string[]
    recentFollows?: IntFieldUpdateOperationsInput | number
    followedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tip?: XOR<TipEntryListUpdateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationUpdatebuyInput | string[]
  }

  export type NotificationCreateManyInput = {
    id?: string
    username: string
    read?: boolean
    followContent?: string
    followNots?: NotificationCreatefollowNotsInput | string[]
    recentFollows?: number
    followedAt?: Date | string
    tip?: XOR<TipEntryListCreateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationCreatebuyInput | string[]
  }

  export type NotificationUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    followContent?: StringFieldUpdateOperationsInput | string
    followNots?: NotificationUpdatefollowNotsInput | string[]
    recentFollows?: IntFieldUpdateOperationsInput | number
    followedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tip?: XOR<TipEntryListUpdateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationUpdatebuyInput | string[]
  }

  export type NotificationUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    followContent?: StringFieldUpdateOperationsInput | string
    followNots?: NotificationUpdatefollowNotsInput | string[]
    recentFollows?: IntFieldUpdateOperationsInput | number
    followedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tip?: XOR<TipEntryListUpdateEnvelopeInput, TipEntryCreateInput> | TipEntryCreateInput[]
    buy?: NotificationUpdatebuyInput | string[]
  }

  export type TipTxsCreateInput = {
    id?: string
    username?: string
    USDC?: number
    ETH?: number
    FLAY?: number
    BNKR?: number
    ZORA?: number
    DEGEN?: number
    tx?: number
  }

  export type TipTxsUncheckedCreateInput = {
    id?: string
    username?: string
    USDC?: number
    ETH?: number
    FLAY?: number
    BNKR?: number
    ZORA?: number
    DEGEN?: number
    tx?: number
  }

  export type TipTxsUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    USDC?: FloatFieldUpdateOperationsInput | number
    ETH?: FloatFieldUpdateOperationsInput | number
    FLAY?: FloatFieldUpdateOperationsInput | number
    BNKR?: FloatFieldUpdateOperationsInput | number
    ZORA?: FloatFieldUpdateOperationsInput | number
    DEGEN?: FloatFieldUpdateOperationsInput | number
    tx?: IntFieldUpdateOperationsInput | number
  }

  export type TipTxsUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    USDC?: FloatFieldUpdateOperationsInput | number
    ETH?: FloatFieldUpdateOperationsInput | number
    FLAY?: FloatFieldUpdateOperationsInput | number
    BNKR?: FloatFieldUpdateOperationsInput | number
    ZORA?: FloatFieldUpdateOperationsInput | number
    DEGEN?: FloatFieldUpdateOperationsInput | number
    tx?: IntFieldUpdateOperationsInput | number
  }

  export type TipTxsCreateManyInput = {
    id?: string
    username?: string
    USDC?: number
    ETH?: number
    FLAY?: number
    BNKR?: number
    ZORA?: number
    DEGEN?: number
    tx?: number
  }

  export type TipTxsUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    USDC?: FloatFieldUpdateOperationsInput | number
    ETH?: FloatFieldUpdateOperationsInput | number
    FLAY?: FloatFieldUpdateOperationsInput | number
    BNKR?: FloatFieldUpdateOperationsInput | number
    ZORA?: FloatFieldUpdateOperationsInput | number
    DEGEN?: FloatFieldUpdateOperationsInput | number
    tx?: IntFieldUpdateOperationsInput | number
  }

  export type TipTxsUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    USDC?: FloatFieldUpdateOperationsInput | number
    ETH?: FloatFieldUpdateOperationsInput | number
    FLAY?: FloatFieldUpdateOperationsInput | number
    BNKR?: FloatFieldUpdateOperationsInput | number
    ZORA?: FloatFieldUpdateOperationsInput | number
    DEGEN?: FloatFieldUpdateOperationsInput | number
    tx?: IntFieldUpdateOperationsInput | number
  }

  export type cVolumeCreateInput = {
    id?: string
    volume: number
    username?: string
  }

  export type cVolumeUncheckedCreateInput = {
    id?: string
    volume: number
    username?: string
  }

  export type cVolumeUpdateInput = {
    volume?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
  }

  export type cVolumeUncheckedUpdateInput = {
    volume?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
  }

  export type cVolumeCreateManyInput = {
    id?: string
    volume: number
    username?: string
  }

  export type cVolumeUpdateManyMutationInput = {
    volume?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
  }

  export type cVolumeUncheckedUpdateManyInput = {
    volume?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    privyId: string
    username: string
    email: string
    userPfp?: string
    walletAddress: string
    sa_address?: string | null
    tokenPrice?: number
    totalStreams?: number
    bio?: string
    epicStreams?: number
    totalFees?: number
    claimDate?: Date | string | null
    emailVerified?: boolean
    role?: $Enums.StreamerRole
    tokenImage?: string | null
    xUrl?: string | null
    ytUrl?: string | null
    followers?: UserCreatefollowersInput | string[]
    following?: UserCreatefollowingInput | string[]
    creatorToken?: string | null
    holdings?: UserCreateholdingsInput | string[]
  }

  export type UserUncheckedCreateInput = {
    id?: string
    privyId: string
    username: string
    email: string
    userPfp?: string
    walletAddress: string
    sa_address?: string | null
    tokenPrice?: number
    totalStreams?: number
    bio?: string
    epicStreams?: number
    totalFees?: number
    claimDate?: Date | string | null
    emailVerified?: boolean
    role?: $Enums.StreamerRole
    tokenImage?: string | null
    xUrl?: string | null
    ytUrl?: string | null
    followers?: UserCreatefollowersInput | string[]
    following?: UserCreatefollowingInput | string[]
    creatorToken?: string | null
    holdings?: UserCreateholdingsInput | string[]
  }

  export type UserUpdateInput = {
    privyId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    userPfp?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    sa_address?: NullableStringFieldUpdateOperationsInput | string | null
    tokenPrice?: FloatFieldUpdateOperationsInput | number
    totalStreams?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    epicStreams?: IntFieldUpdateOperationsInput | number
    totalFees?: FloatFieldUpdateOperationsInput | number
    claimDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumStreamerRoleFieldUpdateOperationsInput | $Enums.StreamerRole
    tokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    xUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ytUrl?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: UserUpdatefollowersInput | string[]
    following?: UserUpdatefollowingInput | string[]
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    holdings?: UserUpdateholdingsInput | string[]
  }

  export type UserUncheckedUpdateInput = {
    privyId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    userPfp?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    sa_address?: NullableStringFieldUpdateOperationsInput | string | null
    tokenPrice?: FloatFieldUpdateOperationsInput | number
    totalStreams?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    epicStreams?: IntFieldUpdateOperationsInput | number
    totalFees?: FloatFieldUpdateOperationsInput | number
    claimDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumStreamerRoleFieldUpdateOperationsInput | $Enums.StreamerRole
    tokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    xUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ytUrl?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: UserUpdatefollowersInput | string[]
    following?: UserUpdatefollowingInput | string[]
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    holdings?: UserUpdateholdingsInput | string[]
  }

  export type UserCreateManyInput = {
    id?: string
    privyId: string
    username: string
    email: string
    userPfp?: string
    walletAddress: string
    sa_address?: string | null
    tokenPrice?: number
    totalStreams?: number
    bio?: string
    epicStreams?: number
    totalFees?: number
    claimDate?: Date | string | null
    emailVerified?: boolean
    role?: $Enums.StreamerRole
    tokenImage?: string | null
    xUrl?: string | null
    ytUrl?: string | null
    followers?: UserCreatefollowersInput | string[]
    following?: UserCreatefollowingInput | string[]
    creatorToken?: string | null
    holdings?: UserCreateholdingsInput | string[]
  }

  export type UserUpdateManyMutationInput = {
    privyId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    userPfp?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    sa_address?: NullableStringFieldUpdateOperationsInput | string | null
    tokenPrice?: FloatFieldUpdateOperationsInput | number
    totalStreams?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    epicStreams?: IntFieldUpdateOperationsInput | number
    totalFees?: FloatFieldUpdateOperationsInput | number
    claimDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumStreamerRoleFieldUpdateOperationsInput | $Enums.StreamerRole
    tokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    xUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ytUrl?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: UserUpdatefollowersInput | string[]
    following?: UserUpdatefollowingInput | string[]
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    holdings?: UserUpdateholdingsInput | string[]
  }

  export type UserUncheckedUpdateManyInput = {
    privyId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    userPfp?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    sa_address?: NullableStringFieldUpdateOperationsInput | string | null
    tokenPrice?: FloatFieldUpdateOperationsInput | number
    totalStreams?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    epicStreams?: IntFieldUpdateOperationsInput | number
    totalFees?: FloatFieldUpdateOperationsInput | number
    claimDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumStreamerRoleFieldUpdateOperationsInput | $Enums.StreamerRole
    tokenImage?: NullableStringFieldUpdateOperationsInput | string | null
    xUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ytUrl?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: UserUpdatefollowersInput | string[]
    following?: UserUpdatefollowingInput | string[]
    creatorToken?: NullableStringFieldUpdateOperationsInput | string | null
    holdings?: UserUpdateholdingsInput | string[]
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    date?: SortOrder
    creatorToken?: SortOrder
    viewers?: SortOrder
    pfp?: SortOrder
    thumbnail?: SortOrder
    status?: SortOrder
    streamer?: SortOrder
  }

  export type StreamAvgOrderByAggregateInput = {
    viewers?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    date?: SortOrder
    creatorToken?: SortOrder
    viewers?: SortOrder
    pfp?: SortOrder
    thumbnail?: SortOrder
    status?: SortOrder
    streamer?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    date?: SortOrder
    creatorToken?: SortOrder
    viewers?: SortOrder
    pfp?: SortOrder
    thumbnail?: SortOrder
    status?: SortOrder
    streamer?: SortOrder
  }

  export type StreamSumOrderByAggregateInput = {
    viewers?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TipEntryCompositeListFilter = {
    equals?: TipEntryObjectEqualityInput[]
    every?: TipEntryWhereInput
    some?: TipEntryWhereInput
    none?: TipEntryWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type TipEntryObjectEqualityInput = {
    token?: string | null
    amount?: string | null
    tipper?: string | null
  }

  export type TipEntryOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    read?: SortOrder
    followContent?: SortOrder
    followNots?: SortOrder
    recentFollows?: SortOrder
    followedAt?: SortOrder
    buy?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    recentFollows?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    read?: SortOrder
    followContent?: SortOrder
    recentFollows?: SortOrder
    followedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    read?: SortOrder
    followContent?: SortOrder
    recentFollows?: SortOrder
    followedAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    recentFollows?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TipTxsCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type TipTxsAvgOrderByAggregateInput = {
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type TipTxsMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type TipTxsMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type TipTxsSumOrderByAggregateInput = {
    USDC?: SortOrder
    ETH?: SortOrder
    FLAY?: SortOrder
    BNKR?: SortOrder
    ZORA?: SortOrder
    DEGEN?: SortOrder
    tx?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type cVolumeCountOrderByAggregateInput = {
    id?: SortOrder
    volume?: SortOrder
    username?: SortOrder
  }

  export type cVolumeAvgOrderByAggregateInput = {
    volume?: SortOrder
  }

  export type cVolumeMaxOrderByAggregateInput = {
    id?: SortOrder
    volume?: SortOrder
    username?: SortOrder
  }

  export type cVolumeMinOrderByAggregateInput = {
    id?: SortOrder
    volume?: SortOrder
    username?: SortOrder
  }

  export type cVolumeSumOrderByAggregateInput = {
    volume?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type EnumStreamerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamerRole | EnumStreamerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamerRoleFilter<$PrismaModel> | $Enums.StreamerRole
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    privyId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    userPfp?: SortOrder
    walletAddress?: SortOrder
    sa_address?: SortOrder
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    bio?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
    claimDate?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    tokenImage?: SortOrder
    xUrl?: SortOrder
    ytUrl?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    creatorToken?: SortOrder
    holdings?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    privyId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    userPfp?: SortOrder
    walletAddress?: SortOrder
    sa_address?: SortOrder
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    bio?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
    claimDate?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    tokenImage?: SortOrder
    xUrl?: SortOrder
    ytUrl?: SortOrder
    creatorToken?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    privyId?: SortOrder
    username?: SortOrder
    email?: SortOrder
    userPfp?: SortOrder
    walletAddress?: SortOrder
    sa_address?: SortOrder
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    bio?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
    claimDate?: SortOrder
    emailVerified?: SortOrder
    role?: SortOrder
    tokenImage?: SortOrder
    xUrl?: SortOrder
    ytUrl?: SortOrder
    creatorToken?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    tokenPrice?: SortOrder
    totalStreams?: SortOrder
    epicStreams?: SortOrder
    totalFees?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumStreamerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamerRole | EnumStreamerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamerRoleWithAggregatesFilter<$PrismaModel> | $Enums.StreamerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamerRoleFilter<$PrismaModel>
    _max?: NestedEnumStreamerRoleFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NotificationCreatefollowNotsInput = {
    set: string[]
  }

  export type TipEntryListCreateEnvelopeInput = {
    set?: TipEntryCreateInput | TipEntryCreateInput[]
  }

  export type TipEntryCreateInput = {
    token?: string | null
    amount?: string | null
    tipper?: string | null
  }

  export type NotificationCreatebuyInput = {
    set: string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NotificationUpdatefollowNotsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TipEntryListUpdateEnvelopeInput = {
    set?: TipEntryCreateInput | TipEntryCreateInput[]
    push?: TipEntryCreateInput | TipEntryCreateInput[]
    updateMany?: TipEntryUpdateManyInput
    deleteMany?: TipEntryDeleteManyInput
  }

  export type NotificationUpdatebuyInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreatefollowersInput = {
    set: string[]
  }

  export type UserCreatefollowingInput = {
    set: string[]
  }

  export type UserCreateholdingsInput = {
    set: string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type EnumStreamerRoleFieldUpdateOperationsInput = {
    set?: $Enums.StreamerRole
  }

  export type UserUpdatefollowersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdatefollowingInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateholdingsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TipEntryWhereInput = {
    AND?: TipEntryWhereInput | TipEntryWhereInput[]
    OR?: TipEntryWhereInput[]
    NOT?: TipEntryWhereInput | TipEntryWhereInput[]
    token?: StringNullableFilter<"TipEntry"> | string | null
    amount?: StringNullableFilter<"TipEntry"> | string | null
    tipper?: StringNullableFilter<"TipEntry"> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedEnumStreamerRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamerRole | EnumStreamerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamerRoleFilter<$PrismaModel> | $Enums.StreamerRole
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumStreamerRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamerRole | EnumStreamerRoleFieldRefInput<$PrismaModel>
    in?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamerRole[] | ListEnumStreamerRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamerRoleWithAggregatesFilter<$PrismaModel> | $Enums.StreamerRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamerRoleFilter<$PrismaModel>
    _max?: NestedEnumStreamerRoleFilter<$PrismaModel>
  }

  export type TipEntryUpdateManyInput = {
    where: TipEntryWhereInput
    data: TipEntryUpdateInput
  }

  export type TipEntryDeleteManyInput = {
    where: TipEntryWhereInput
  }

  export type TipEntryUpdateInput = {
    token?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    tipper?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}