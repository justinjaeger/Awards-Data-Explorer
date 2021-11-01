
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Movie
 */

export type Movie = {
  id: string
  wikiUrl: string
  title: string
  year: number
  imdbUrl: string | null
}

/**
 * Model Person
 */

export type Person = {
  id: string
  wikiUrl: string
  name: string
}

/**
 * Model Nomination
 */

export type Nomination = {
  id: string
  winner: boolean
  personId: string
  movieId: string
}

/**
 * Model AwardsBody
 */

export type AwardsBody = {
  id: string
  name: string
}

/**
 * Model AwardsCategory
 */

export type AwardsCategory = {
  id: string
  name: string
}

/**
 * Model Award
 */

export type Award = {
  id: string
  year: string
  awardsBodyId: string
  awardsCategoryId: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Movies
 * const movies = await prisma.movie.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Movies
   * const movies = await prisma.movie.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.$executeRaw``, values will be escaped automatically
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.$executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.$queryRaw``, values will be escaped automatically
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.$queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<GlobalReject>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<GlobalReject>;

  /**
   * `prisma.nomination`: Exposes CRUD operations for the **Nomination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nominations
    * const nominations = await prisma.nomination.findMany()
    * ```
    */
  get nomination(): Prisma.NominationDelegate<GlobalReject>;

  /**
   * `prisma.awardsBody`: Exposes CRUD operations for the **AwardsBody** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardsBodies
    * const awardsBodies = await prisma.awardsBody.findMany()
    * ```
    */
  get awardsBody(): Prisma.AwardsBodyDelegate<GlobalReject>;

  /**
   * `prisma.awardsCategory`: Exposes CRUD operations for the **AwardsCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardsCategories
    * const awardsCategories = await prisma.awardsCategory.findMany()
    * ```
    */
  get awardsCategory(): Prisma.AwardsCategoryDelegate<GlobalReject>;

  /**
   * `prisma.award`: Exposes CRUD operations for the **Award** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Awards
    * const awards = await prisma.award.findMany()
    * ```
    */
  get award(): Prisma.AwardDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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

  /**
   * Prisma Client JS version: 2.30.3
   * Query Engine version: b8c35d44de987a9691890b3ddf3e2e7effb9bf20
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

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
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Movie: 'Movie',
    Person: 'Person',
    Nomination: 'Nomination',
    AwardsBody: 'AwardsBody',
    AwardsCategory: 'AwardsCategory',
    Award: 'Award'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
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
   * Model Movie
   */


  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
    max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    year: number | null
  }

  export type MovieSumAggregateOutputType = {
    year: number | null
  }

  export type MovieMinAggregateOutputType = {
    id: string | null
    wikiUrl: string | null
    title: string | null
    year: number | null
    imdbUrl: string | null
  }

  export type MovieMaxAggregateOutputType = {
    id: string | null
    wikiUrl: string | null
    title: string | null
    year: number | null
    imdbUrl: string | null
  }

  export type MovieCountAggregateOutputType = {
    id: number
    wikiUrl: number
    title: number
    year: number
    imdbUrl: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    year?: true
  }

  export type MovieSumAggregateInputType = {
    year?: true
  }

  export type MovieMinAggregateInputType = {
    id?: true
    wikiUrl?: true
    title?: true
    year?: true
    imdbUrl?: true
  }

  export type MovieMaxAggregateInputType = {
    id?: true
    wikiUrl?: true
    title?: true
    year?: true
    imdbUrl?: true
  }

  export type MovieCountAggregateInputType = {
    id?: true
    wikiUrl?: true
    title?: true
    year?: true
    imdbUrl?: true
    _all?: true
  }

  export type MovieAggregateArgs = {
    /**
     * Filter which Movie to aggregate.
     * 
    **/
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     * 
    **/
    orderBy?: Enumerable<MovieOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_avg`
    **/
    avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_sum`
    **/
    sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }


    
    
  export type MovieGroupByArgs = {
    where?: MovieWhereInput
    orderBy?: Enumerable<MovieOrderByInput>
    by: Array<MovieScalarFieldEnum>
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }


  export type MovieGroupByOutputType = {
    id: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl: string | null
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Promise<
    Array<
      PickArray<MovieGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], MovieGroupByOutputType[P]> 
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      > 
    >


  export type MovieSelect = {
    id?: boolean
    wikiUrl?: boolean
    title?: boolean
    year?: boolean
    imdbUrl?: boolean
    nominations?: boolean | NominationFindManyArgs
  }

  export type MovieInclude = {
    nominations?: boolean | NominationFindManyArgs
  }

  export type MovieGetPayload<
    S extends boolean | null | undefined | MovieArgs,
    U = keyof S
      > = S extends true
        ? Movie
    : S extends undefined
    ? never
    : S extends MovieArgs | MovieFindManyArgs
    ?'include' extends U
    ? Movie  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'nominations'
        ? Array < NominationGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Movie ?Movie [P]
  : 
          P extends 'nominations'
        ? Array < NominationGetPayload<S['select'][P]>>  : never
  } 
    : Movie
  : Movie


  type MovieCountArgs = Merge<
    Omit<MovieFindManyArgs, 'select' | 'include'> & {
      select?: MovieCountAggregateInputType | true
    }
  >

  export interface MovieDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MovieFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MovieFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Movie'> extends True ? CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>> : CheckSelect<T, Prisma__MovieClient<Movie | null >, Prisma__MovieClient<MovieGetPayload<T> | null >>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MovieFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MovieFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Movie'> extends True ? CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>> : CheckSelect<T, Prisma__MovieClient<Movie | null >, Prisma__MovieClient<MovieGetPayload<T> | null >>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieWithIdOnly = await prisma.movie.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MovieFindManyArgs>(
      args?: SelectSubset<T, MovieFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Movie>>, PrismaPromise<Array<MovieGetPayload<T>>>>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
    **/
    create<T extends MovieCreateArgs>(
      args: SelectSubset<T, MovieCreateArgs>
    ): CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>>

    /**
     * Create many Movies.
     *     @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     *     @example
     *     // Create many Movies
     *     const movie = await prisma.movie.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MovieCreateManyArgs>(
      args?: SelectSubset<T, MovieCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
    **/
    delete<T extends MovieDeleteArgs>(
      args: SelectSubset<T, MovieDeleteArgs>
    ): CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MovieUpdateArgs>(
      args: SelectSubset<T, MovieUpdateArgs>
    ): CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MovieDeleteManyArgs>(
      args?: SelectSubset<T, MovieDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MovieUpdateManyArgs>(
      args: SelectSubset<T, MovieUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
    **/
    upsert<T extends MovieUpsertArgs>(
      args: SelectSubset<T, MovieUpsertArgs>
    ): CheckSelect<T, Prisma__MovieClient<Movie>, Prisma__MovieClient<MovieGetPayload<T>>>

    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
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
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MovieClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    nominations<T extends NominationFindManyArgs = {}>(args?: Subset<T, NominationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Nomination>>, PrismaPromise<Array<NominationGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * Throw an Error if a Movie can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Movie to fetch.
     * 
    **/
    where: MovieWhereUniqueInput
  }


  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * Throw an Error if a Movie can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Movie to fetch.
     * 
    **/
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     * 
    **/
    orderBy?: Enumerable<MovieOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     * 
    **/
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     * 
    **/
    distinct?: Enumerable<MovieScalarFieldEnum>
  }


  /**
   * Movie findMany
   */
  export type MovieFindManyArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * Filter, which Movies to fetch.
     * 
    **/
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     * 
    **/
    orderBy?: Enumerable<MovieOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     * 
    **/
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MovieScalarFieldEnum>
  }


  /**
   * Movie create
   */
  export type MovieCreateArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * The data needed to create a Movie.
     * 
    **/
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }


  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs = {
    data: Enumerable<MovieCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Movie update
   */
  export type MovieUpdateArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * The data needed to update a Movie.
     * 
    **/
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     * 
    **/
    where: MovieWhereUniqueInput
  }


  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs = {
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    where?: MovieWhereInput
  }


  /**
   * Movie upsert
   */
  export type MovieUpsertArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * The filter to search for the Movie to update in case it exists.
     * 
    **/
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     * 
    **/
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }


  /**
   * Movie delete
   */
  export type MovieDeleteArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
    /**
     * Filter which Movie to delete.
     * 
    **/
    where: MovieWhereUniqueInput
  }


  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs = {
    where?: MovieWhereInput
  }


  /**
   * Movie without action
   */
  export type MovieArgs = {
    /**
     * Select specific fields to fetch from the Movie
     * 
    **/
    select?: MovieSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: MovieInclude | null
  }



  /**
   * Model Person
   */


  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
    max: PersonMaxAggregateOutputType | null
  }

  export type PersonMinAggregateOutputType = {
    id: string | null
    wikiUrl: string | null
    name: string | null
  }

  export type PersonMaxAggregateOutputType = {
    id: string | null
    wikiUrl: string | null
    name: string | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    wikiUrl: number
    name: number
    _all: number
  }


  export type PersonMinAggregateInputType = {
    id?: true
    wikiUrl?: true
    name?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    wikiUrl?: true
    name?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    wikiUrl?: true
    name?: true
    _all?: true
  }

  export type PersonAggregateArgs = {
    /**
     * Filter which Person to aggregate.
     * 
    **/
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     * 
    **/
    orderBy?: Enumerable<PersonOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }


    
    
  export type PersonGroupByArgs = {
    where?: PersonWhereInput
    orderBy?: Enumerable<PersonOrderByInput>
    by: Array<PersonScalarFieldEnum>
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }


  export type PersonGroupByOutputType = {
    id: string
    wikiUrl: string
    name: string
    _count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Promise<
    Array<
      PickArray<PersonGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PersonGroupByOutputType[P]> 
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      > 
    >


  export type PersonSelect = {
    id?: boolean
    wikiUrl?: boolean
    name?: boolean
    nominations?: boolean | NominationFindManyArgs
  }

  export type PersonInclude = {
    nominations?: boolean | NominationFindManyArgs
  }

  export type PersonGetPayload<
    S extends boolean | null | undefined | PersonArgs,
    U = keyof S
      > = S extends true
        ? Person
    : S extends undefined
    ? never
    : S extends PersonArgs | PersonFindManyArgs
    ?'include' extends U
    ? Person  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'nominations'
        ? Array < NominationGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Person ?Person [P]
  : 
          P extends 'nominations'
        ? Array < NominationGetPayload<S['select'][P]>>  : never
  } 
    : Person
  : Person


  type PersonCountArgs = Merge<
    Omit<PersonFindManyArgs, 'select' | 'include'> & {
      select?: PersonCountAggregateInputType | true
    }
  >

  export interface PersonDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PersonFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PersonFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Person'> extends True ? CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>> : CheckSelect<T, Prisma__PersonClient<Person | null >, Prisma__PersonClient<PersonGetPayload<T> | null >>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PersonFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PersonFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Person'> extends True ? CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>> : CheckSelect<T, Prisma__PersonClient<Person | null >, Prisma__PersonClient<PersonGetPayload<T> | null >>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PersonFindManyArgs>(
      args?: SelectSubset<T, PersonFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Person>>, PrismaPromise<Array<PersonGetPayload<T>>>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
    **/
    create<T extends PersonCreateArgs>(
      args: SelectSubset<T, PersonCreateArgs>
    ): CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>>

    /**
     * Create many People.
     *     @param {PersonCreateManyArgs} args - Arguments to create many People.
     *     @example
     *     // Create many People
     *     const person = await prisma.person.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PersonCreateManyArgs>(
      args?: SelectSubset<T, PersonCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
    **/
    delete<T extends PersonDeleteArgs>(
      args: SelectSubset<T, PersonDeleteArgs>
    ): CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PersonUpdateArgs>(
      args: SelectSubset<T, PersonUpdateArgs>
    ): CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PersonDeleteManyArgs>(
      args?: SelectSubset<T, PersonDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PersonUpdateManyArgs>(
      args: SelectSubset<T, PersonUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
    **/
    upsert<T extends PersonUpsertArgs>(
      args: SelectSubset<T, PersonUpsertArgs>
    ): CheckSelect<T, Prisma__PersonClient<Person>, Prisma__PersonClient<PersonGetPayload<T>>>

    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
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
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PersonClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    nominations<T extends NominationFindManyArgs = {}>(args?: Subset<T, NominationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Nomination>>, PrismaPromise<Array<NominationGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * Throw an Error if a Person can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Person to fetch.
     * 
    **/
    where: PersonWhereUniqueInput
  }


  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * Throw an Error if a Person can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Person to fetch.
     * 
    **/
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     * 
    **/
    orderBy?: Enumerable<PersonOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     * 
    **/
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     * 
    **/
    distinct?: Enumerable<PersonScalarFieldEnum>
  }


  /**
   * Person findMany
   */
  export type PersonFindManyArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * Filter, which People to fetch.
     * 
    **/
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     * 
    **/
    orderBy?: Enumerable<PersonOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     * 
    **/
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PersonScalarFieldEnum>
  }


  /**
   * Person create
   */
  export type PersonCreateArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * The data needed to create a Person.
     * 
    **/
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }


  /**
   * Person createMany
   */
  export type PersonCreateManyArgs = {
    data: Enumerable<PersonCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Person update
   */
  export type PersonUpdateArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * The data needed to update a Person.
     * 
    **/
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     * 
    **/
    where: PersonWhereUniqueInput
  }


  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs = {
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    where?: PersonWhereInput
  }


  /**
   * Person upsert
   */
  export type PersonUpsertArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * The filter to search for the Person to update in case it exists.
     * 
    **/
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     * 
    **/
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }


  /**
   * Person delete
   */
  export type PersonDeleteArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
    /**
     * Filter which Person to delete.
     * 
    **/
    where: PersonWhereUniqueInput
  }


  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs = {
    where?: PersonWhereInput
  }


  /**
   * Person without action
   */
  export type PersonArgs = {
    /**
     * Select specific fields to fetch from the Person
     * 
    **/
    select?: PersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PersonInclude | null
  }



  /**
   * Model Nomination
   */


  export type AggregateNomination = {
    _count: NominationCountAggregateOutputType | null
    count: NominationCountAggregateOutputType | null
    _min: NominationMinAggregateOutputType | null
    min: NominationMinAggregateOutputType | null
    _max: NominationMaxAggregateOutputType | null
    max: NominationMaxAggregateOutputType | null
  }

  export type NominationMinAggregateOutputType = {
    id: string | null
    winner: boolean | null
    personId: string | null
    movieId: string | null
  }

  export type NominationMaxAggregateOutputType = {
    id: string | null
    winner: boolean | null
    personId: string | null
    movieId: string | null
  }

  export type NominationCountAggregateOutputType = {
    id: number
    winner: number
    personId: number
    movieId: number
    _all: number
  }


  export type NominationMinAggregateInputType = {
    id?: true
    winner?: true
    personId?: true
    movieId?: true
  }

  export type NominationMaxAggregateInputType = {
    id?: true
    winner?: true
    personId?: true
    movieId?: true
  }

  export type NominationCountAggregateInputType = {
    id?: true
    winner?: true
    personId?: true
    movieId?: true
    _all?: true
  }

  export type NominationAggregateArgs = {
    /**
     * Filter which Nomination to aggregate.
     * 
    **/
    where?: NominationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nominations to fetch.
     * 
    **/
    orderBy?: Enumerable<NominationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NominationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nominations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nominations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Nominations
    **/
    _count?: true | NominationCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | NominationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NominationMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: NominationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NominationMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: NominationMaxAggregateInputType
  }

  export type GetNominationAggregateType<T extends NominationAggregateArgs> = {
        [P in keyof T & keyof AggregateNomination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNomination[P]>
      : GetScalarType<T[P], AggregateNomination[P]>
  }


    
    
  export type NominationGroupByArgs = {
    where?: NominationWhereInput
    orderBy?: Enumerable<NominationOrderByInput>
    by: Array<NominationScalarFieldEnum>
    having?: NominationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NominationCountAggregateInputType | true
    _min?: NominationMinAggregateInputType
    _max?: NominationMaxAggregateInputType
  }


  export type NominationGroupByOutputType = {
    id: string
    winner: boolean
    personId: string
    movieId: string
    _count: NominationCountAggregateOutputType | null
    _min: NominationMinAggregateOutputType | null
    _max: NominationMaxAggregateOutputType | null
  }

  type GetNominationGroupByPayload<T extends NominationGroupByArgs> = Promise<
    Array<
      PickArray<NominationGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof NominationGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], NominationGroupByOutputType[P]> 
            : GetScalarType<T[P], NominationGroupByOutputType[P]>
        }
      > 
    >


  export type NominationSelect = {
    id?: boolean
    winner?: boolean
    person?: boolean | PersonArgs
    personId?: boolean
    movie?: boolean | MovieArgs
    movieId?: boolean
  }

  export type NominationInclude = {
    person?: boolean | PersonArgs
    movie?: boolean | MovieArgs
  }

  export type NominationGetPayload<
    S extends boolean | null | undefined | NominationArgs,
    U = keyof S
      > = S extends true
        ? Nomination
    : S extends undefined
    ? never
    : S extends NominationArgs | NominationFindManyArgs
    ?'include' extends U
    ? Nomination  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'person'
        ? PersonGetPayload<S['include'][P]> :
        P extends 'movie'
        ? MovieGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Nomination ?Nomination [P]
  : 
          P extends 'person'
        ? PersonGetPayload<S['select'][P]> :
        P extends 'movie'
        ? MovieGetPayload<S['select'][P]> : never
  } 
    : Nomination
  : Nomination


  type NominationCountArgs = Merge<
    Omit<NominationFindManyArgs, 'select' | 'include'> & {
      select?: NominationCountAggregateInputType | true
    }
  >

  export interface NominationDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Nomination that matches the filter.
     * @param {NominationFindUniqueArgs} args - Arguments to find a Nomination
     * @example
     * // Get one Nomination
     * const nomination = await prisma.nomination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NominationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NominationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Nomination'> extends True ? CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>> : CheckSelect<T, Prisma__NominationClient<Nomination | null >, Prisma__NominationClient<NominationGetPayload<T> | null >>

    /**
     * Find the first Nomination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationFindFirstArgs} args - Arguments to find a Nomination
     * @example
     * // Get one Nomination
     * const nomination = await prisma.nomination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NominationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NominationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Nomination'> extends True ? CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>> : CheckSelect<T, Prisma__NominationClient<Nomination | null >, Prisma__NominationClient<NominationGetPayload<T> | null >>

    /**
     * Find zero or more Nominations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nominations
     * const nominations = await prisma.nomination.findMany()
     * 
     * // Get first 10 Nominations
     * const nominations = await prisma.nomination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nominationWithIdOnly = await prisma.nomination.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NominationFindManyArgs>(
      args?: SelectSubset<T, NominationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Nomination>>, PrismaPromise<Array<NominationGetPayload<T>>>>

    /**
     * Create a Nomination.
     * @param {NominationCreateArgs} args - Arguments to create a Nomination.
     * @example
     * // Create one Nomination
     * const Nomination = await prisma.nomination.create({
     *   data: {
     *     // ... data to create a Nomination
     *   }
     * })
     * 
    **/
    create<T extends NominationCreateArgs>(
      args: SelectSubset<T, NominationCreateArgs>
    ): CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>>

    /**
     * Create many Nominations.
     *     @param {NominationCreateManyArgs} args - Arguments to create many Nominations.
     *     @example
     *     // Create many Nominations
     *     const nomination = await prisma.nomination.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NominationCreateManyArgs>(
      args?: SelectSubset<T, NominationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Nomination.
     * @param {NominationDeleteArgs} args - Arguments to delete one Nomination.
     * @example
     * // Delete one Nomination
     * const Nomination = await prisma.nomination.delete({
     *   where: {
     *     // ... filter to delete one Nomination
     *   }
     * })
     * 
    **/
    delete<T extends NominationDeleteArgs>(
      args: SelectSubset<T, NominationDeleteArgs>
    ): CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>>

    /**
     * Update one Nomination.
     * @param {NominationUpdateArgs} args - Arguments to update one Nomination.
     * @example
     * // Update one Nomination
     * const nomination = await prisma.nomination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NominationUpdateArgs>(
      args: SelectSubset<T, NominationUpdateArgs>
    ): CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>>

    /**
     * Delete zero or more Nominations.
     * @param {NominationDeleteManyArgs} args - Arguments to filter Nominations to delete.
     * @example
     * // Delete a few Nominations
     * const { count } = await prisma.nomination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NominationDeleteManyArgs>(
      args?: SelectSubset<T, NominationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nominations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nominations
     * const nomination = await prisma.nomination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NominationUpdateManyArgs>(
      args: SelectSubset<T, NominationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Nomination.
     * @param {NominationUpsertArgs} args - Arguments to update or create a Nomination.
     * @example
     * // Update or create a Nomination
     * const nomination = await prisma.nomination.upsert({
     *   create: {
     *     // ... data to create a Nomination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nomination we want to update
     *   }
     * })
    **/
    upsert<T extends NominationUpsertArgs>(
      args: SelectSubset<T, NominationUpsertArgs>
    ): CheckSelect<T, Prisma__NominationClient<Nomination>, Prisma__NominationClient<NominationGetPayload<T>>>

    /**
     * Count the number of Nominations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationCountArgs} args - Arguments to filter Nominations to count.
     * @example
     * // Count the number of Nominations
     * const count = await prisma.nomination.count({
     *   where: {
     *     // ... the filter for the Nominations we want to count
     *   }
     * })
    **/
    count<T extends NominationCountArgs>(
      args?: Subset<T, NominationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NominationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nomination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NominationAggregateArgs>(args: Subset<T, NominationAggregateArgs>): PrismaPromise<GetNominationAggregateType<T>>

    /**
     * Group by Nomination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NominationGroupByArgs} args - Group by arguments.
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
      T extends NominationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NominationGroupByArgs['orderBy'] }
        : { orderBy?: NominationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, NominationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNominationGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Nomination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NominationClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    person<T extends PersonArgs = {}>(args?: Subset<T, PersonArgs>): CheckSelect<T, Prisma__PersonClient<Person | null >, Prisma__PersonClient<PersonGetPayload<T> | null >>;

    movie<T extends MovieArgs = {}>(args?: Subset<T, MovieArgs>): CheckSelect<T, Prisma__MovieClient<Movie | null >, Prisma__MovieClient<MovieGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Nomination findUnique
   */
  export type NominationFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * Throw an Error if a Nomination can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Nomination to fetch.
     * 
    **/
    where: NominationWhereUniqueInput
  }


  /**
   * Nomination findFirst
   */
  export type NominationFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * Throw an Error if a Nomination can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Nomination to fetch.
     * 
    **/
    where?: NominationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nominations to fetch.
     * 
    **/
    orderBy?: Enumerable<NominationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nominations.
     * 
    **/
    cursor?: NominationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nominations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nominations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nominations.
     * 
    **/
    distinct?: Enumerable<NominationScalarFieldEnum>
  }


  /**
   * Nomination findMany
   */
  export type NominationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * Filter, which Nominations to fetch.
     * 
    **/
    where?: NominationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nominations to fetch.
     * 
    **/
    orderBy?: Enumerable<NominationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Nominations.
     * 
    **/
    cursor?: NominationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nominations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nominations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NominationScalarFieldEnum>
  }


  /**
   * Nomination create
   */
  export type NominationCreateArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * The data needed to create a Nomination.
     * 
    **/
    data: XOR<NominationCreateInput, NominationUncheckedCreateInput>
  }


  /**
   * Nomination createMany
   */
  export type NominationCreateManyArgs = {
    data: Enumerable<NominationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Nomination update
   */
  export type NominationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * The data needed to update a Nomination.
     * 
    **/
    data: XOR<NominationUpdateInput, NominationUncheckedUpdateInput>
    /**
     * Choose, which Nomination to update.
     * 
    **/
    where: NominationWhereUniqueInput
  }


  /**
   * Nomination updateMany
   */
  export type NominationUpdateManyArgs = {
    data: XOR<NominationUpdateManyMutationInput, NominationUncheckedUpdateManyInput>
    where?: NominationWhereInput
  }


  /**
   * Nomination upsert
   */
  export type NominationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * The filter to search for the Nomination to update in case it exists.
     * 
    **/
    where: NominationWhereUniqueInput
    /**
     * In case the Nomination found by the `where` argument doesn't exist, create a new Nomination with this data.
     * 
    **/
    create: XOR<NominationCreateInput, NominationUncheckedCreateInput>
    /**
     * In case the Nomination was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NominationUpdateInput, NominationUncheckedUpdateInput>
  }


  /**
   * Nomination delete
   */
  export type NominationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
    /**
     * Filter which Nomination to delete.
     * 
    **/
    where: NominationWhereUniqueInput
  }


  /**
   * Nomination deleteMany
   */
  export type NominationDeleteManyArgs = {
    where?: NominationWhereInput
  }


  /**
   * Nomination without action
   */
  export type NominationArgs = {
    /**
     * Select specific fields to fetch from the Nomination
     * 
    **/
    select?: NominationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NominationInclude | null
  }



  /**
   * Model AwardsBody
   */


  export type AggregateAwardsBody = {
    _count: AwardsBodyCountAggregateOutputType | null
    count: AwardsBodyCountAggregateOutputType | null
    _min: AwardsBodyMinAggregateOutputType | null
    min: AwardsBodyMinAggregateOutputType | null
    _max: AwardsBodyMaxAggregateOutputType | null
    max: AwardsBodyMaxAggregateOutputType | null
  }

  export type AwardsBodyMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type AwardsBodyMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type AwardsBodyCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type AwardsBodyMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type AwardsBodyMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type AwardsBodyCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type AwardsBodyAggregateArgs = {
    /**
     * Filter which AwardsBody to aggregate.
     * 
    **/
    where?: AwardsBodyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsBodies to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsBodyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AwardsBodyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsBodies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsBodies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardsBodies
    **/
    _count?: true | AwardsBodyCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | AwardsBodyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardsBodyMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: AwardsBodyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardsBodyMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: AwardsBodyMaxAggregateInputType
  }

  export type GetAwardsBodyAggregateType<T extends AwardsBodyAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardsBody]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardsBody[P]>
      : GetScalarType<T[P], AggregateAwardsBody[P]>
  }


    
    
  export type AwardsBodyGroupByArgs = {
    where?: AwardsBodyWhereInput
    orderBy?: Enumerable<AwardsBodyOrderByInput>
    by: Array<AwardsBodyScalarFieldEnum>
    having?: AwardsBodyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardsBodyCountAggregateInputType | true
    _min?: AwardsBodyMinAggregateInputType
    _max?: AwardsBodyMaxAggregateInputType
  }


  export type AwardsBodyGroupByOutputType = {
    id: string
    name: string
    _count: AwardsBodyCountAggregateOutputType | null
    _min: AwardsBodyMinAggregateOutputType | null
    _max: AwardsBodyMaxAggregateOutputType | null
  }

  type GetAwardsBodyGroupByPayload<T extends AwardsBodyGroupByArgs> = Promise<
    Array<
      PickArray<AwardsBodyGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof AwardsBodyGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], AwardsBodyGroupByOutputType[P]> 
            : GetScalarType<T[P], AwardsBodyGroupByOutputType[P]>
        }
      > 
    >


  export type AwardsBodySelect = {
    id?: boolean
    name?: boolean
    awards?: boolean | AwardFindManyArgs
  }

  export type AwardsBodyInclude = {
    awards?: boolean | AwardFindManyArgs
  }

  export type AwardsBodyGetPayload<
    S extends boolean | null | undefined | AwardsBodyArgs,
    U = keyof S
      > = S extends true
        ? AwardsBody
    : S extends undefined
    ? never
    : S extends AwardsBodyArgs | AwardsBodyFindManyArgs
    ?'include' extends U
    ? AwardsBody  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'awards'
        ? Array < AwardGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof AwardsBody ?AwardsBody [P]
  : 
          P extends 'awards'
        ? Array < AwardGetPayload<S['select'][P]>>  : never
  } 
    : AwardsBody
  : AwardsBody


  type AwardsBodyCountArgs = Merge<
    Omit<AwardsBodyFindManyArgs, 'select' | 'include'> & {
      select?: AwardsBodyCountAggregateInputType | true
    }
  >

  export interface AwardsBodyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AwardsBody that matches the filter.
     * @param {AwardsBodyFindUniqueArgs} args - Arguments to find a AwardsBody
     * @example
     * // Get one AwardsBody
     * const awardsBody = await prisma.awardsBody.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AwardsBodyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AwardsBodyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AwardsBody'> extends True ? CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>> : CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody | null >, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T> | null >>

    /**
     * Find the first AwardsBody that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyFindFirstArgs} args - Arguments to find a AwardsBody
     * @example
     * // Get one AwardsBody
     * const awardsBody = await prisma.awardsBody.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AwardsBodyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AwardsBodyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AwardsBody'> extends True ? CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>> : CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody | null >, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T> | null >>

    /**
     * Find zero or more AwardsBodies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardsBodies
     * const awardsBodies = await prisma.awardsBody.findMany()
     * 
     * // Get first 10 AwardsBodies
     * const awardsBodies = await prisma.awardsBody.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardsBodyWithIdOnly = await prisma.awardsBody.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AwardsBodyFindManyArgs>(
      args?: SelectSubset<T, AwardsBodyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AwardsBody>>, PrismaPromise<Array<AwardsBodyGetPayload<T>>>>

    /**
     * Create a AwardsBody.
     * @param {AwardsBodyCreateArgs} args - Arguments to create a AwardsBody.
     * @example
     * // Create one AwardsBody
     * const AwardsBody = await prisma.awardsBody.create({
     *   data: {
     *     // ... data to create a AwardsBody
     *   }
     * })
     * 
    **/
    create<T extends AwardsBodyCreateArgs>(
      args: SelectSubset<T, AwardsBodyCreateArgs>
    ): CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>>

    /**
     * Create many AwardsBodies.
     *     @param {AwardsBodyCreateManyArgs} args - Arguments to create many AwardsBodies.
     *     @example
     *     // Create many AwardsBodies
     *     const awardsBody = await prisma.awardsBody.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AwardsBodyCreateManyArgs>(
      args?: SelectSubset<T, AwardsBodyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AwardsBody.
     * @param {AwardsBodyDeleteArgs} args - Arguments to delete one AwardsBody.
     * @example
     * // Delete one AwardsBody
     * const AwardsBody = await prisma.awardsBody.delete({
     *   where: {
     *     // ... filter to delete one AwardsBody
     *   }
     * })
     * 
    **/
    delete<T extends AwardsBodyDeleteArgs>(
      args: SelectSubset<T, AwardsBodyDeleteArgs>
    ): CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>>

    /**
     * Update one AwardsBody.
     * @param {AwardsBodyUpdateArgs} args - Arguments to update one AwardsBody.
     * @example
     * // Update one AwardsBody
     * const awardsBody = await prisma.awardsBody.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AwardsBodyUpdateArgs>(
      args: SelectSubset<T, AwardsBodyUpdateArgs>
    ): CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>>

    /**
     * Delete zero or more AwardsBodies.
     * @param {AwardsBodyDeleteManyArgs} args - Arguments to filter AwardsBodies to delete.
     * @example
     * // Delete a few AwardsBodies
     * const { count } = await prisma.awardsBody.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AwardsBodyDeleteManyArgs>(
      args?: SelectSubset<T, AwardsBodyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardsBodies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardsBodies
     * const awardsBody = await prisma.awardsBody.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AwardsBodyUpdateManyArgs>(
      args: SelectSubset<T, AwardsBodyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AwardsBody.
     * @param {AwardsBodyUpsertArgs} args - Arguments to update or create a AwardsBody.
     * @example
     * // Update or create a AwardsBody
     * const awardsBody = await prisma.awardsBody.upsert({
     *   create: {
     *     // ... data to create a AwardsBody
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardsBody we want to update
     *   }
     * })
    **/
    upsert<T extends AwardsBodyUpsertArgs>(
      args: SelectSubset<T, AwardsBodyUpsertArgs>
    ): CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody>, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T>>>

    /**
     * Count the number of AwardsBodies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyCountArgs} args - Arguments to filter AwardsBodies to count.
     * @example
     * // Count the number of AwardsBodies
     * const count = await prisma.awardsBody.count({
     *   where: {
     *     // ... the filter for the AwardsBodies we want to count
     *   }
     * })
    **/
    count<T extends AwardsBodyCountArgs>(
      args?: Subset<T, AwardsBodyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardsBodyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardsBody.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AwardsBodyAggregateArgs>(args: Subset<T, AwardsBodyAggregateArgs>): PrismaPromise<GetAwardsBodyAggregateType<T>>

    /**
     * Group by AwardsBody.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsBodyGroupByArgs} args - Group by arguments.
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
      T extends AwardsBodyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardsBodyGroupByArgs['orderBy'] }
        : { orderBy?: AwardsBodyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AwardsBodyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardsBodyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardsBody.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AwardsBodyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    awards<T extends AwardFindManyArgs = {}>(args?: Subset<T, AwardFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Award>>, PrismaPromise<Array<AwardGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AwardsBody findUnique
   */
  export type AwardsBodyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * Throw an Error if a AwardsBody can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AwardsBody to fetch.
     * 
    **/
    where: AwardsBodyWhereUniqueInput
  }


  /**
   * AwardsBody findFirst
   */
  export type AwardsBodyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * Throw an Error if a AwardsBody can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AwardsBody to fetch.
     * 
    **/
    where?: AwardsBodyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsBodies to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsBodyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardsBodies.
     * 
    **/
    cursor?: AwardsBodyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsBodies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsBodies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardsBodies.
     * 
    **/
    distinct?: Enumerable<AwardsBodyScalarFieldEnum>
  }


  /**
   * AwardsBody findMany
   */
  export type AwardsBodyFindManyArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * Filter, which AwardsBodies to fetch.
     * 
    **/
    where?: AwardsBodyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsBodies to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsBodyOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardsBodies.
     * 
    **/
    cursor?: AwardsBodyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsBodies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsBodies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AwardsBodyScalarFieldEnum>
  }


  /**
   * AwardsBody create
   */
  export type AwardsBodyCreateArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * The data needed to create a AwardsBody.
     * 
    **/
    data: XOR<AwardsBodyCreateInput, AwardsBodyUncheckedCreateInput>
  }


  /**
   * AwardsBody createMany
   */
  export type AwardsBodyCreateManyArgs = {
    data: Enumerable<AwardsBodyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AwardsBody update
   */
  export type AwardsBodyUpdateArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * The data needed to update a AwardsBody.
     * 
    **/
    data: XOR<AwardsBodyUpdateInput, AwardsBodyUncheckedUpdateInput>
    /**
     * Choose, which AwardsBody to update.
     * 
    **/
    where: AwardsBodyWhereUniqueInput
  }


  /**
   * AwardsBody updateMany
   */
  export type AwardsBodyUpdateManyArgs = {
    data: XOR<AwardsBodyUpdateManyMutationInput, AwardsBodyUncheckedUpdateManyInput>
    where?: AwardsBodyWhereInput
  }


  /**
   * AwardsBody upsert
   */
  export type AwardsBodyUpsertArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * The filter to search for the AwardsBody to update in case it exists.
     * 
    **/
    where: AwardsBodyWhereUniqueInput
    /**
     * In case the AwardsBody found by the `where` argument doesn't exist, create a new AwardsBody with this data.
     * 
    **/
    create: XOR<AwardsBodyCreateInput, AwardsBodyUncheckedCreateInput>
    /**
     * In case the AwardsBody was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AwardsBodyUpdateInput, AwardsBodyUncheckedUpdateInput>
  }


  /**
   * AwardsBody delete
   */
  export type AwardsBodyDeleteArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
    /**
     * Filter which AwardsBody to delete.
     * 
    **/
    where: AwardsBodyWhereUniqueInput
  }


  /**
   * AwardsBody deleteMany
   */
  export type AwardsBodyDeleteManyArgs = {
    where?: AwardsBodyWhereInput
  }


  /**
   * AwardsBody without action
   */
  export type AwardsBodyArgs = {
    /**
     * Select specific fields to fetch from the AwardsBody
     * 
    **/
    select?: AwardsBodySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsBodyInclude | null
  }



  /**
   * Model AwardsCategory
   */


  export type AggregateAwardsCategory = {
    _count: AwardsCategoryCountAggregateOutputType | null
    count: AwardsCategoryCountAggregateOutputType | null
    _min: AwardsCategoryMinAggregateOutputType | null
    min: AwardsCategoryMinAggregateOutputType | null
    _max: AwardsCategoryMaxAggregateOutputType | null
    max: AwardsCategoryMaxAggregateOutputType | null
  }

  export type AwardsCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type AwardsCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type AwardsCategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type AwardsCategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type AwardsCategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type AwardsCategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type AwardsCategoryAggregateArgs = {
    /**
     * Filter which AwardsCategory to aggregate.
     * 
    **/
    where?: AwardsCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AwardsCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardsCategories
    **/
    _count?: true | AwardsCategoryCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | AwardsCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardsCategoryMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: AwardsCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardsCategoryMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: AwardsCategoryMaxAggregateInputType
  }

  export type GetAwardsCategoryAggregateType<T extends AwardsCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardsCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardsCategory[P]>
      : GetScalarType<T[P], AggregateAwardsCategory[P]>
  }


    
    
  export type AwardsCategoryGroupByArgs = {
    where?: AwardsCategoryWhereInput
    orderBy?: Enumerable<AwardsCategoryOrderByInput>
    by: Array<AwardsCategoryScalarFieldEnum>
    having?: AwardsCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardsCategoryCountAggregateInputType | true
    _min?: AwardsCategoryMinAggregateInputType
    _max?: AwardsCategoryMaxAggregateInputType
  }


  export type AwardsCategoryGroupByOutputType = {
    id: string
    name: string
    _count: AwardsCategoryCountAggregateOutputType | null
    _min: AwardsCategoryMinAggregateOutputType | null
    _max: AwardsCategoryMaxAggregateOutputType | null
  }

  type GetAwardsCategoryGroupByPayload<T extends AwardsCategoryGroupByArgs> = Promise<
    Array<
      PickArray<AwardsCategoryGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof AwardsCategoryGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], AwardsCategoryGroupByOutputType[P]> 
            : GetScalarType<T[P], AwardsCategoryGroupByOutputType[P]>
        }
      > 
    >


  export type AwardsCategorySelect = {
    id?: boolean
    name?: boolean
    awards?: boolean | AwardFindManyArgs
  }

  export type AwardsCategoryInclude = {
    awards?: boolean | AwardFindManyArgs
  }

  export type AwardsCategoryGetPayload<
    S extends boolean | null | undefined | AwardsCategoryArgs,
    U = keyof S
      > = S extends true
        ? AwardsCategory
    : S extends undefined
    ? never
    : S extends AwardsCategoryArgs | AwardsCategoryFindManyArgs
    ?'include' extends U
    ? AwardsCategory  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'awards'
        ? Array < AwardGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof AwardsCategory ?AwardsCategory [P]
  : 
          P extends 'awards'
        ? Array < AwardGetPayload<S['select'][P]>>  : never
  } 
    : AwardsCategory
  : AwardsCategory


  type AwardsCategoryCountArgs = Merge<
    Omit<AwardsCategoryFindManyArgs, 'select' | 'include'> & {
      select?: AwardsCategoryCountAggregateInputType | true
    }
  >

  export interface AwardsCategoryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AwardsCategory that matches the filter.
     * @param {AwardsCategoryFindUniqueArgs} args - Arguments to find a AwardsCategory
     * @example
     * // Get one AwardsCategory
     * const awardsCategory = await prisma.awardsCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AwardsCategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AwardsCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AwardsCategory'> extends True ? CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>> : CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory | null >, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T> | null >>

    /**
     * Find the first AwardsCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryFindFirstArgs} args - Arguments to find a AwardsCategory
     * @example
     * // Get one AwardsCategory
     * const awardsCategory = await prisma.awardsCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AwardsCategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AwardsCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AwardsCategory'> extends True ? CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>> : CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory | null >, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T> | null >>

    /**
     * Find zero or more AwardsCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardsCategories
     * const awardsCategories = await prisma.awardsCategory.findMany()
     * 
     * // Get first 10 AwardsCategories
     * const awardsCategories = await prisma.awardsCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardsCategoryWithIdOnly = await prisma.awardsCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AwardsCategoryFindManyArgs>(
      args?: SelectSubset<T, AwardsCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AwardsCategory>>, PrismaPromise<Array<AwardsCategoryGetPayload<T>>>>

    /**
     * Create a AwardsCategory.
     * @param {AwardsCategoryCreateArgs} args - Arguments to create a AwardsCategory.
     * @example
     * // Create one AwardsCategory
     * const AwardsCategory = await prisma.awardsCategory.create({
     *   data: {
     *     // ... data to create a AwardsCategory
     *   }
     * })
     * 
    **/
    create<T extends AwardsCategoryCreateArgs>(
      args: SelectSubset<T, AwardsCategoryCreateArgs>
    ): CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>>

    /**
     * Create many AwardsCategories.
     *     @param {AwardsCategoryCreateManyArgs} args - Arguments to create many AwardsCategories.
     *     @example
     *     // Create many AwardsCategories
     *     const awardsCategory = await prisma.awardsCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AwardsCategoryCreateManyArgs>(
      args?: SelectSubset<T, AwardsCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AwardsCategory.
     * @param {AwardsCategoryDeleteArgs} args - Arguments to delete one AwardsCategory.
     * @example
     * // Delete one AwardsCategory
     * const AwardsCategory = await prisma.awardsCategory.delete({
     *   where: {
     *     // ... filter to delete one AwardsCategory
     *   }
     * })
     * 
    **/
    delete<T extends AwardsCategoryDeleteArgs>(
      args: SelectSubset<T, AwardsCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>>

    /**
     * Update one AwardsCategory.
     * @param {AwardsCategoryUpdateArgs} args - Arguments to update one AwardsCategory.
     * @example
     * // Update one AwardsCategory
     * const awardsCategory = await prisma.awardsCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AwardsCategoryUpdateArgs>(
      args: SelectSubset<T, AwardsCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>>

    /**
     * Delete zero or more AwardsCategories.
     * @param {AwardsCategoryDeleteManyArgs} args - Arguments to filter AwardsCategories to delete.
     * @example
     * // Delete a few AwardsCategories
     * const { count } = await prisma.awardsCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AwardsCategoryDeleteManyArgs>(
      args?: SelectSubset<T, AwardsCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardsCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardsCategories
     * const awardsCategory = await prisma.awardsCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AwardsCategoryUpdateManyArgs>(
      args: SelectSubset<T, AwardsCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AwardsCategory.
     * @param {AwardsCategoryUpsertArgs} args - Arguments to update or create a AwardsCategory.
     * @example
     * // Update or create a AwardsCategory
     * const awardsCategory = await prisma.awardsCategory.upsert({
     *   create: {
     *     // ... data to create a AwardsCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardsCategory we want to update
     *   }
     * })
    **/
    upsert<T extends AwardsCategoryUpsertArgs>(
      args: SelectSubset<T, AwardsCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory>, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T>>>

    /**
     * Count the number of AwardsCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryCountArgs} args - Arguments to filter AwardsCategories to count.
     * @example
     * // Count the number of AwardsCategories
     * const count = await prisma.awardsCategory.count({
     *   where: {
     *     // ... the filter for the AwardsCategories we want to count
     *   }
     * })
    **/
    count<T extends AwardsCategoryCountArgs>(
      args?: Subset<T, AwardsCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardsCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardsCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AwardsCategoryAggregateArgs>(args: Subset<T, AwardsCategoryAggregateArgs>): PrismaPromise<GetAwardsCategoryAggregateType<T>>

    /**
     * Group by AwardsCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardsCategoryGroupByArgs} args - Group by arguments.
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
      T extends AwardsCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardsCategoryGroupByArgs['orderBy'] }
        : { orderBy?: AwardsCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AwardsCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardsCategoryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardsCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AwardsCategoryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    awards<T extends AwardFindManyArgs = {}>(args?: Subset<T, AwardFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Award>>, PrismaPromise<Array<AwardGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AwardsCategory findUnique
   */
  export type AwardsCategoryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * Throw an Error if a AwardsCategory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AwardsCategory to fetch.
     * 
    **/
    where: AwardsCategoryWhereUniqueInput
  }


  /**
   * AwardsCategory findFirst
   */
  export type AwardsCategoryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * Throw an Error if a AwardsCategory can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which AwardsCategory to fetch.
     * 
    **/
    where?: AwardsCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardsCategories.
     * 
    **/
    cursor?: AwardsCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardsCategories.
     * 
    **/
    distinct?: Enumerable<AwardsCategoryScalarFieldEnum>
  }


  /**
   * AwardsCategory findMany
   */
  export type AwardsCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * Filter, which AwardsCategories to fetch.
     * 
    **/
    where?: AwardsCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardsCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardsCategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardsCategories.
     * 
    **/
    cursor?: AwardsCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardsCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardsCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AwardsCategoryScalarFieldEnum>
  }


  /**
   * AwardsCategory create
   */
  export type AwardsCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * The data needed to create a AwardsCategory.
     * 
    **/
    data: XOR<AwardsCategoryCreateInput, AwardsCategoryUncheckedCreateInput>
  }


  /**
   * AwardsCategory createMany
   */
  export type AwardsCategoryCreateManyArgs = {
    data: Enumerable<AwardsCategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AwardsCategory update
   */
  export type AwardsCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * The data needed to update a AwardsCategory.
     * 
    **/
    data: XOR<AwardsCategoryUpdateInput, AwardsCategoryUncheckedUpdateInput>
    /**
     * Choose, which AwardsCategory to update.
     * 
    **/
    where: AwardsCategoryWhereUniqueInput
  }


  /**
   * AwardsCategory updateMany
   */
  export type AwardsCategoryUpdateManyArgs = {
    data: XOR<AwardsCategoryUpdateManyMutationInput, AwardsCategoryUncheckedUpdateManyInput>
    where?: AwardsCategoryWhereInput
  }


  /**
   * AwardsCategory upsert
   */
  export type AwardsCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * The filter to search for the AwardsCategory to update in case it exists.
     * 
    **/
    where: AwardsCategoryWhereUniqueInput
    /**
     * In case the AwardsCategory found by the `where` argument doesn't exist, create a new AwardsCategory with this data.
     * 
    **/
    create: XOR<AwardsCategoryCreateInput, AwardsCategoryUncheckedCreateInput>
    /**
     * In case the AwardsCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AwardsCategoryUpdateInput, AwardsCategoryUncheckedUpdateInput>
  }


  /**
   * AwardsCategory delete
   */
  export type AwardsCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
    /**
     * Filter which AwardsCategory to delete.
     * 
    **/
    where: AwardsCategoryWhereUniqueInput
  }


  /**
   * AwardsCategory deleteMany
   */
  export type AwardsCategoryDeleteManyArgs = {
    where?: AwardsCategoryWhereInput
  }


  /**
   * AwardsCategory without action
   */
  export type AwardsCategoryArgs = {
    /**
     * Select specific fields to fetch from the AwardsCategory
     * 
    **/
    select?: AwardsCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardsCategoryInclude | null
  }



  /**
   * Model Award
   */


  export type AggregateAward = {
    _count: AwardCountAggregateOutputType | null
    count: AwardCountAggregateOutputType | null
    _min: AwardMinAggregateOutputType | null
    min: AwardMinAggregateOutputType | null
    _max: AwardMaxAggregateOutputType | null
    max: AwardMaxAggregateOutputType | null
  }

  export type AwardMinAggregateOutputType = {
    id: string | null
    year: string | null
    awardsBodyId: string | null
    awardsCategoryId: string | null
  }

  export type AwardMaxAggregateOutputType = {
    id: string | null
    year: string | null
    awardsBodyId: string | null
    awardsCategoryId: string | null
  }

  export type AwardCountAggregateOutputType = {
    id: number
    year: number
    awardsBodyId: number
    awardsCategoryId: number
    _all: number
  }


  export type AwardMinAggregateInputType = {
    id?: true
    year?: true
    awardsBodyId?: true
    awardsCategoryId?: true
  }

  export type AwardMaxAggregateInputType = {
    id?: true
    year?: true
    awardsBodyId?: true
    awardsCategoryId?: true
  }

  export type AwardCountAggregateInputType = {
    id?: true
    year?: true
    awardsBodyId?: true
    awardsCategoryId?: true
    _all?: true
  }

  export type AwardAggregateArgs = {
    /**
     * Filter which Award to aggregate.
     * 
    **/
    where?: AwardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Awards to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AwardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Awards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Awards.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Awards
    **/
    _count?: true | AwardCountAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_count`
    **/
    count?: true | AwardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardMinAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_min`
    **/
    min?: AwardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardMaxAggregateInputType
    /**
     * @deprecated since 2.23.0 please use `_max`
    **/
    max?: AwardMaxAggregateInputType
  }

  export type GetAwardAggregateType<T extends AwardAggregateArgs> = {
        [P in keyof T & keyof AggregateAward]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAward[P]>
      : GetScalarType<T[P], AggregateAward[P]>
  }


    
    
  export type AwardGroupByArgs = {
    where?: AwardWhereInput
    orderBy?: Enumerable<AwardOrderByInput>
    by: Array<AwardScalarFieldEnum>
    having?: AwardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardCountAggregateInputType | true
    _min?: AwardMinAggregateInputType
    _max?: AwardMaxAggregateInputType
  }


  export type AwardGroupByOutputType = {
    id: string
    year: string
    awardsBodyId: string
    awardsCategoryId: string
    _count: AwardCountAggregateOutputType | null
    _min: AwardMinAggregateOutputType | null
    _max: AwardMaxAggregateOutputType | null
  }

  type GetAwardGroupByPayload<T extends AwardGroupByArgs> = Promise<
    Array<
      PickArray<AwardGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof AwardGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], AwardGroupByOutputType[P]> 
            : GetScalarType<T[P], AwardGroupByOutputType[P]>
        }
      > 
    >


  export type AwardSelect = {
    id?: boolean
    year?: boolean
    awardsBody?: boolean | AwardsBodyArgs
    awardsBodyId?: boolean
    awardsCategory?: boolean | AwardsCategoryArgs
    awardsCategoryId?: boolean
  }

  export type AwardInclude = {
    awardsBody?: boolean | AwardsBodyArgs
    awardsCategory?: boolean | AwardsCategoryArgs
  }

  export type AwardGetPayload<
    S extends boolean | null | undefined | AwardArgs,
    U = keyof S
      > = S extends true
        ? Award
    : S extends undefined
    ? never
    : S extends AwardArgs | AwardFindManyArgs
    ?'include' extends U
    ? Award  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'awardsBody'
        ? AwardsBodyGetPayload<S['include'][P]> :
        P extends 'awardsCategory'
        ? AwardsCategoryGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Award ?Award [P]
  : 
          P extends 'awardsBody'
        ? AwardsBodyGetPayload<S['select'][P]> :
        P extends 'awardsCategory'
        ? AwardsCategoryGetPayload<S['select'][P]> : never
  } 
    : Award
  : Award


  type AwardCountArgs = Merge<
    Omit<AwardFindManyArgs, 'select' | 'include'> & {
      select?: AwardCountAggregateInputType | true
    }
  >

  export interface AwardDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Award that matches the filter.
     * @param {AwardFindUniqueArgs} args - Arguments to find a Award
     * @example
     * // Get one Award
     * const award = await prisma.award.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AwardFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AwardFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Award'> extends True ? CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>> : CheckSelect<T, Prisma__AwardClient<Award | null >, Prisma__AwardClient<AwardGetPayload<T> | null >>

    /**
     * Find the first Award that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardFindFirstArgs} args - Arguments to find a Award
     * @example
     * // Get one Award
     * const award = await prisma.award.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AwardFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AwardFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Award'> extends True ? CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>> : CheckSelect<T, Prisma__AwardClient<Award | null >, Prisma__AwardClient<AwardGetPayload<T> | null >>

    /**
     * Find zero or more Awards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Awards
     * const awards = await prisma.award.findMany()
     * 
     * // Get first 10 Awards
     * const awards = await prisma.award.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardWithIdOnly = await prisma.award.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AwardFindManyArgs>(
      args?: SelectSubset<T, AwardFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Award>>, PrismaPromise<Array<AwardGetPayload<T>>>>

    /**
     * Create a Award.
     * @param {AwardCreateArgs} args - Arguments to create a Award.
     * @example
     * // Create one Award
     * const Award = await prisma.award.create({
     *   data: {
     *     // ... data to create a Award
     *   }
     * })
     * 
    **/
    create<T extends AwardCreateArgs>(
      args: SelectSubset<T, AwardCreateArgs>
    ): CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>>

    /**
     * Create many Awards.
     *     @param {AwardCreateManyArgs} args - Arguments to create many Awards.
     *     @example
     *     // Create many Awards
     *     const award = await prisma.award.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AwardCreateManyArgs>(
      args?: SelectSubset<T, AwardCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Award.
     * @param {AwardDeleteArgs} args - Arguments to delete one Award.
     * @example
     * // Delete one Award
     * const Award = await prisma.award.delete({
     *   where: {
     *     // ... filter to delete one Award
     *   }
     * })
     * 
    **/
    delete<T extends AwardDeleteArgs>(
      args: SelectSubset<T, AwardDeleteArgs>
    ): CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>>

    /**
     * Update one Award.
     * @param {AwardUpdateArgs} args - Arguments to update one Award.
     * @example
     * // Update one Award
     * const award = await prisma.award.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AwardUpdateArgs>(
      args: SelectSubset<T, AwardUpdateArgs>
    ): CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>>

    /**
     * Delete zero or more Awards.
     * @param {AwardDeleteManyArgs} args - Arguments to filter Awards to delete.
     * @example
     * // Delete a few Awards
     * const { count } = await prisma.award.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AwardDeleteManyArgs>(
      args?: SelectSubset<T, AwardDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Awards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Awards
     * const award = await prisma.award.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AwardUpdateManyArgs>(
      args: SelectSubset<T, AwardUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Award.
     * @param {AwardUpsertArgs} args - Arguments to update or create a Award.
     * @example
     * // Update or create a Award
     * const award = await prisma.award.upsert({
     *   create: {
     *     // ... data to create a Award
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Award we want to update
     *   }
     * })
    **/
    upsert<T extends AwardUpsertArgs>(
      args: SelectSubset<T, AwardUpsertArgs>
    ): CheckSelect<T, Prisma__AwardClient<Award>, Prisma__AwardClient<AwardGetPayload<T>>>

    /**
     * Count the number of Awards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardCountArgs} args - Arguments to filter Awards to count.
     * @example
     * // Count the number of Awards
     * const count = await prisma.award.count({
     *   where: {
     *     // ... the filter for the Awards we want to count
     *   }
     * })
    **/
    count<T extends AwardCountArgs>(
      args?: Subset<T, AwardCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Award.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AwardAggregateArgs>(args: Subset<T, AwardAggregateArgs>): PrismaPromise<GetAwardAggregateType<T>>

    /**
     * Group by Award.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardGroupByArgs} args - Group by arguments.
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
      T extends AwardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardGroupByArgs['orderBy'] }
        : { orderBy?: AwardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AwardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Award.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AwardClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    awardsBody<T extends AwardsBodyArgs = {}>(args?: Subset<T, AwardsBodyArgs>): CheckSelect<T, Prisma__AwardsBodyClient<AwardsBody | null >, Prisma__AwardsBodyClient<AwardsBodyGetPayload<T> | null >>;

    awardsCategory<T extends AwardsCategoryArgs = {}>(args?: Subset<T, AwardsCategoryArgs>): CheckSelect<T, Prisma__AwardsCategoryClient<AwardsCategory | null >, Prisma__AwardsCategoryClient<AwardsCategoryGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Award findUnique
   */
  export type AwardFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * Throw an Error if a Award can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Award to fetch.
     * 
    **/
    where: AwardWhereUniqueInput
  }


  /**
   * Award findFirst
   */
  export type AwardFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * Throw an Error if a Award can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Award to fetch.
     * 
    **/
    where?: AwardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Awards to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Awards.
     * 
    **/
    cursor?: AwardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Awards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Awards.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Awards.
     * 
    **/
    distinct?: Enumerable<AwardScalarFieldEnum>
  }


  /**
   * Award findMany
   */
  export type AwardFindManyArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * Filter, which Awards to fetch.
     * 
    **/
    where?: AwardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Awards to fetch.
     * 
    **/
    orderBy?: Enumerable<AwardOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Awards.
     * 
    **/
    cursor?: AwardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Awards from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Awards.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AwardScalarFieldEnum>
  }


  /**
   * Award create
   */
  export type AwardCreateArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * The data needed to create a Award.
     * 
    **/
    data: XOR<AwardCreateInput, AwardUncheckedCreateInput>
  }


  /**
   * Award createMany
   */
  export type AwardCreateManyArgs = {
    data: Enumerable<AwardCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Award update
   */
  export type AwardUpdateArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * The data needed to update a Award.
     * 
    **/
    data: XOR<AwardUpdateInput, AwardUncheckedUpdateInput>
    /**
     * Choose, which Award to update.
     * 
    **/
    where: AwardWhereUniqueInput
  }


  /**
   * Award updateMany
   */
  export type AwardUpdateManyArgs = {
    data: XOR<AwardUpdateManyMutationInput, AwardUncheckedUpdateManyInput>
    where?: AwardWhereInput
  }


  /**
   * Award upsert
   */
  export type AwardUpsertArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * The filter to search for the Award to update in case it exists.
     * 
    **/
    where: AwardWhereUniqueInput
    /**
     * In case the Award found by the `where` argument doesn't exist, create a new Award with this data.
     * 
    **/
    create: XOR<AwardCreateInput, AwardUncheckedCreateInput>
    /**
     * In case the Award was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AwardUpdateInput, AwardUncheckedUpdateInput>
  }


  /**
   * Award delete
   */
  export type AwardDeleteArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
    /**
     * Filter which Award to delete.
     * 
    **/
    where: AwardWhereUniqueInput
  }


  /**
   * Award deleteMany
   */
  export type AwardDeleteManyArgs = {
    where?: AwardWhereInput
  }


  /**
   * Award without action
   */
  export type AwardArgs = {
    /**
     * Select specific fields to fetch from the Award
     * 
    **/
    select?: AwardSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AwardInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const MovieScalarFieldEnum: {
    id: 'id',
    wikiUrl: 'wikiUrl',
    title: 'title',
    year: 'year',
    imdbUrl: 'imdbUrl'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    id: 'id',
    wikiUrl: 'wikiUrl',
    name: 'name'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const NominationScalarFieldEnum: {
    id: 'id',
    winner: 'winner',
    personId: 'personId',
    movieId: 'movieId'
  };

  export type NominationScalarFieldEnum = (typeof NominationScalarFieldEnum)[keyof typeof NominationScalarFieldEnum]


  export const AwardsBodyScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type AwardsBodyScalarFieldEnum = (typeof AwardsBodyScalarFieldEnum)[keyof typeof AwardsBodyScalarFieldEnum]


  export const AwardsCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type AwardsCategoryScalarFieldEnum = (typeof AwardsCategoryScalarFieldEnum)[keyof typeof AwardsCategoryScalarFieldEnum]


  export const AwardScalarFieldEnum: {
    id: 'id',
    year: 'year',
    awardsBodyId: 'awardsBodyId',
    awardsCategoryId: 'awardsCategoryId'
  };

  export type AwardScalarFieldEnum = (typeof AwardScalarFieldEnum)[keyof typeof AwardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type MovieWhereInput = {
    AND?: Enumerable<MovieWhereInput>
    OR?: Enumerable<MovieWhereInput>
    NOT?: Enumerable<MovieWhereInput>
    id?: StringFilter | string
    wikiUrl?: StringFilter | string
    title?: StringFilter | string
    year?: IntFilter | number
    imdbUrl?: StringNullableFilter | string | null
    nominations?: NominationListRelationFilter
  }

  export type MovieOrderByInput = {
    id?: SortOrder
    wikiUrl?: SortOrder
    title?: SortOrder
    year?: SortOrder
    imdbUrl?: SortOrder
  }

  export type MovieWhereUniqueInput = {
    id?: string
    wikiUrl?: string
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MovieScalarWhereWithAggregatesInput>
    OR?: Enumerable<MovieScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MovieScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    wikiUrl?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    year?: IntWithAggregatesFilter | number
    imdbUrl?: StringNullableWithAggregatesFilter | string | null
  }

  export type PersonWhereInput = {
    AND?: Enumerable<PersonWhereInput>
    OR?: Enumerable<PersonWhereInput>
    NOT?: Enumerable<PersonWhereInput>
    id?: StringFilter | string
    wikiUrl?: StringFilter | string
    name?: StringFilter | string
    nominations?: NominationListRelationFilter
  }

  export type PersonOrderByInput = {
    id?: SortOrder
    wikiUrl?: SortOrder
    name?: SortOrder
  }

  export type PersonWhereUniqueInput = {
    id?: string
    wikiUrl?: string
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PersonScalarWhereWithAggregatesInput>
    OR?: Enumerable<PersonScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PersonScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    wikiUrl?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
  }

  export type NominationWhereInput = {
    AND?: Enumerable<NominationWhereInput>
    OR?: Enumerable<NominationWhereInput>
    NOT?: Enumerable<NominationWhereInput>
    id?: StringFilter | string
    winner?: BoolFilter | boolean
    person?: XOR<PersonRelationFilter, PersonWhereInput>
    personId?: StringFilter | string
    movie?: XOR<MovieRelationFilter, MovieWhereInput>
    movieId?: StringFilter | string
  }

  export type NominationOrderByInput = {
    id?: SortOrder
    winner?: SortOrder
    personId?: SortOrder
    movieId?: SortOrder
  }

  export type NominationWhereUniqueInput = {
    id?: string
  }

  export type NominationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NominationScalarWhereWithAggregatesInput>
    OR?: Enumerable<NominationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NominationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    winner?: BoolWithAggregatesFilter | boolean
    personId?: StringWithAggregatesFilter | string
    movieId?: StringWithAggregatesFilter | string
  }

  export type AwardsBodyWhereInput = {
    AND?: Enumerable<AwardsBodyWhereInput>
    OR?: Enumerable<AwardsBodyWhereInput>
    NOT?: Enumerable<AwardsBodyWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    awards?: AwardListRelationFilter
  }

  export type AwardsBodyOrderByInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type AwardsBodyWhereUniqueInput = {
    id?: string
  }

  export type AwardsBodyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AwardsBodyScalarWhereWithAggregatesInput>
    OR?: Enumerable<AwardsBodyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AwardsBodyScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
  }

  export type AwardsCategoryWhereInput = {
    AND?: Enumerable<AwardsCategoryWhereInput>
    OR?: Enumerable<AwardsCategoryWhereInput>
    NOT?: Enumerable<AwardsCategoryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    awards?: AwardListRelationFilter
  }

  export type AwardsCategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type AwardsCategoryWhereUniqueInput = {
    id?: string
  }

  export type AwardsCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AwardsCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<AwardsCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AwardsCategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
  }

  export type AwardWhereInput = {
    AND?: Enumerable<AwardWhereInput>
    OR?: Enumerable<AwardWhereInput>
    NOT?: Enumerable<AwardWhereInput>
    id?: StringFilter | string
    year?: StringFilter | string
    awardsBody?: XOR<AwardsBodyRelationFilter, AwardsBodyWhereInput>
    awardsBodyId?: StringFilter | string
    awardsCategory?: XOR<AwardsCategoryRelationFilter, AwardsCategoryWhereInput>
    awardsCategoryId?: StringFilter | string
  }

  export type AwardOrderByInput = {
    id?: SortOrder
    year?: SortOrder
    awardsBodyId?: SortOrder
    awardsCategoryId?: SortOrder
  }

  export type AwardWhereUniqueInput = {
    id?: string
  }

  export type AwardScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AwardScalarWhereWithAggregatesInput>
    OR?: Enumerable<AwardScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AwardScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    year?: StringWithAggregatesFilter | string
    awardsBodyId?: StringWithAggregatesFilter | string
    awardsCategoryId?: StringWithAggregatesFilter | string
  }

  export type MovieCreateInput = {
    id?: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl?: string | null
    nominations?: NominationCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateInput = {
    id?: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl?: string | null
    nominations?: NominationUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nominations?: NominationUpdateManyWithoutMovieInput
  }

  export type MovieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nominations?: NominationUncheckedUpdateManyWithoutMovieInput
  }

  export type MovieCreateManyInput = {
    id?: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl?: string | null
  }

  export type MovieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MovieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonCreateInput = {
    id?: string
    wikiUrl: string
    name: string
    nominations?: NominationCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateInput = {
    id?: string
    wikiUrl: string
    name: string
    nominations?: NominationUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nominations?: NominationUpdateManyWithoutPersonInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nominations?: NominationUncheckedUpdateManyWithoutPersonInput
  }

  export type PersonCreateManyInput = {
    id?: string
    wikiUrl: string
    name: string
  }

  export type PersonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NominationCreateInput = {
    id?: string
    winner?: boolean
    person: PersonCreateNestedOneWithoutNominationsInput
    movie: MovieCreateNestedOneWithoutNominationsInput
  }

  export type NominationUncheckedCreateInput = {
    id?: string
    winner?: boolean
    personId: string
    movieId: string
  }

  export type NominationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    person?: PersonUpdateOneRequiredWithoutNominationsInput
    movie?: MovieUpdateOneRequiredWithoutNominationsInput
  }

  export type NominationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type NominationCreateManyInput = {
    id?: string
    winner?: boolean
    personId: string
    movieId: string
  }

  export type NominationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
  }

  export type NominationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsBodyCreateInput = {
    id?: string
    name: string
    awards?: AwardCreateNestedManyWithoutAwardsBodyInput
  }

  export type AwardsBodyUncheckedCreateInput = {
    id?: string
    name: string
    awards?: AwardUncheckedCreateNestedManyWithoutAwardsBodyInput
  }

  export type AwardsBodyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    awards?: AwardUpdateManyWithoutAwardsBodyInput
  }

  export type AwardsBodyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    awards?: AwardUncheckedUpdateManyWithoutAwardsBodyInput
  }

  export type AwardsBodyCreateManyInput = {
    id?: string
    name: string
  }

  export type AwardsBodyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsBodyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsCategoryCreateInput = {
    id?: string
    name: string
    awards?: AwardCreateNestedManyWithoutAwardsCategoryInput
  }

  export type AwardsCategoryUncheckedCreateInput = {
    id?: string
    name: string
    awards?: AwardUncheckedCreateNestedManyWithoutAwardsCategoryInput
  }

  export type AwardsCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    awards?: AwardUpdateManyWithoutAwardsCategoryInput
  }

  export type AwardsCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    awards?: AwardUncheckedUpdateManyWithoutAwardsCategoryInput
  }

  export type AwardsCategoryCreateManyInput = {
    id?: string
    name: string
  }

  export type AwardsCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardCreateInput = {
    id?: string
    year: string
    awardsBody: AwardsBodyCreateNestedOneWithoutAwardsInput
    awardsCategory: AwardsCategoryCreateNestedOneWithoutAwardsInput
  }

  export type AwardUncheckedCreateInput = {
    id?: string
    year: string
    awardsBodyId: string
    awardsCategoryId: string
  }

  export type AwardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsBody?: AwardsBodyUpdateOneRequiredWithoutAwardsInput
    awardsCategory?: AwardsCategoryUpdateOneRequiredWithoutAwardsInput
  }

  export type AwardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsBodyId?: StringFieldUpdateOperationsInput | string
    awardsCategoryId?: StringFieldUpdateOperationsInput | string
  }

  export type AwardCreateManyInput = {
    id?: string
    year: string
    awardsBodyId: string
    awardsCategoryId: string
  }

  export type AwardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
  }

  export type AwardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsBodyId?: StringFieldUpdateOperationsInput | string
    awardsCategoryId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NominationListRelationFilter = {
    every?: NominationWhereInput
    some?: NominationWhereInput
    none?: NominationWhereInput
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type PersonRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type MovieRelationFilter = {
    is?: MovieWhereInput
    isNot?: MovieWhereInput
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type AwardListRelationFilter = {
    every?: AwardWhereInput
    some?: AwardWhereInput
    none?: AwardWhereInput
  }

  export type AwardsBodyRelationFilter = {
    is?: AwardsBodyWhereInput
    isNot?: AwardsBodyWhereInput
  }

  export type AwardsCategoryRelationFilter = {
    is?: AwardsCategoryWhereInput
    isNot?: AwardsCategoryWhereInput
  }

  export type NominationCreateNestedManyWithoutMovieInput = {
    create?: XOR<Enumerable<NominationCreateWithoutMovieInput>, Enumerable<NominationUncheckedCreateWithoutMovieInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutMovieInput>
    createMany?: NominationCreateManyMovieInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
  }

  export type NominationUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<Enumerable<NominationCreateWithoutMovieInput>, Enumerable<NominationUncheckedCreateWithoutMovieInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutMovieInput>
    createMany?: NominationCreateManyMovieInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NominationUpdateManyWithoutMovieInput = {
    create?: XOR<Enumerable<NominationCreateWithoutMovieInput>, Enumerable<NominationUncheckedCreateWithoutMovieInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutMovieInput>
    upsert?: Enumerable<NominationUpsertWithWhereUniqueWithoutMovieInput>
    createMany?: NominationCreateManyMovieInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
    set?: Enumerable<NominationWhereUniqueInput>
    disconnect?: Enumerable<NominationWhereUniqueInput>
    delete?: Enumerable<NominationWhereUniqueInput>
    update?: Enumerable<NominationUpdateWithWhereUniqueWithoutMovieInput>
    updateMany?: Enumerable<NominationUpdateManyWithWhereWithoutMovieInput>
    deleteMany?: Enumerable<NominationScalarWhereInput>
  }

  export type NominationUncheckedUpdateManyWithoutMovieInput = {
    create?: XOR<Enumerable<NominationCreateWithoutMovieInput>, Enumerable<NominationUncheckedCreateWithoutMovieInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutMovieInput>
    upsert?: Enumerable<NominationUpsertWithWhereUniqueWithoutMovieInput>
    createMany?: NominationCreateManyMovieInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
    set?: Enumerable<NominationWhereUniqueInput>
    disconnect?: Enumerable<NominationWhereUniqueInput>
    delete?: Enumerable<NominationWhereUniqueInput>
    update?: Enumerable<NominationUpdateWithWhereUniqueWithoutMovieInput>
    updateMany?: Enumerable<NominationUpdateManyWithWhereWithoutMovieInput>
    deleteMany?: Enumerable<NominationScalarWhereInput>
  }

  export type NominationCreateNestedManyWithoutPersonInput = {
    create?: XOR<Enumerable<NominationCreateWithoutPersonInput>, Enumerable<NominationUncheckedCreateWithoutPersonInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutPersonInput>
    createMany?: NominationCreateManyPersonInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
  }

  export type NominationUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<Enumerable<NominationCreateWithoutPersonInput>, Enumerable<NominationUncheckedCreateWithoutPersonInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutPersonInput>
    createMany?: NominationCreateManyPersonInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
  }

  export type NominationUpdateManyWithoutPersonInput = {
    create?: XOR<Enumerable<NominationCreateWithoutPersonInput>, Enumerable<NominationUncheckedCreateWithoutPersonInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutPersonInput>
    upsert?: Enumerable<NominationUpsertWithWhereUniqueWithoutPersonInput>
    createMany?: NominationCreateManyPersonInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
    set?: Enumerable<NominationWhereUniqueInput>
    disconnect?: Enumerable<NominationWhereUniqueInput>
    delete?: Enumerable<NominationWhereUniqueInput>
    update?: Enumerable<NominationUpdateWithWhereUniqueWithoutPersonInput>
    updateMany?: Enumerable<NominationUpdateManyWithWhereWithoutPersonInput>
    deleteMany?: Enumerable<NominationScalarWhereInput>
  }

  export type NominationUncheckedUpdateManyWithoutPersonInput = {
    create?: XOR<Enumerable<NominationCreateWithoutPersonInput>, Enumerable<NominationUncheckedCreateWithoutPersonInput>>
    connectOrCreate?: Enumerable<NominationCreateOrConnectWithoutPersonInput>
    upsert?: Enumerable<NominationUpsertWithWhereUniqueWithoutPersonInput>
    createMany?: NominationCreateManyPersonInputEnvelope
    connect?: Enumerable<NominationWhereUniqueInput>
    set?: Enumerable<NominationWhereUniqueInput>
    disconnect?: Enumerable<NominationWhereUniqueInput>
    delete?: Enumerable<NominationWhereUniqueInput>
    update?: Enumerable<NominationUpdateWithWhereUniqueWithoutPersonInput>
    updateMany?: Enumerable<NominationUpdateManyWithWhereWithoutPersonInput>
    deleteMany?: Enumerable<NominationScalarWhereInput>
  }

  export type PersonCreateNestedOneWithoutNominationsInput = {
    create?: XOR<PersonCreateWithoutNominationsInput, PersonUncheckedCreateWithoutNominationsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutNominationsInput
    connect?: PersonWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutNominationsInput = {
    create?: XOR<MovieCreateWithoutNominationsInput, MovieUncheckedCreateWithoutNominationsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutNominationsInput
    connect?: MovieWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PersonUpdateOneRequiredWithoutNominationsInput = {
    create?: XOR<PersonCreateWithoutNominationsInput, PersonUncheckedCreateWithoutNominationsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutNominationsInput
    upsert?: PersonUpsertWithoutNominationsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<PersonUpdateWithoutNominationsInput, PersonUncheckedUpdateWithoutNominationsInput>
  }

  export type MovieUpdateOneRequiredWithoutNominationsInput = {
    create?: XOR<MovieCreateWithoutNominationsInput, MovieUncheckedCreateWithoutNominationsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutNominationsInput
    upsert?: MovieUpsertWithoutNominationsInput
    connect?: MovieWhereUniqueInput
    update?: XOR<MovieUpdateWithoutNominationsInput, MovieUncheckedUpdateWithoutNominationsInput>
  }

  export type AwardCreateNestedManyWithoutAwardsBodyInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsBodyInput>, Enumerable<AwardUncheckedCreateWithoutAwardsBodyInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsBodyInput>
    createMany?: AwardCreateManyAwardsBodyInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
  }

  export type AwardUncheckedCreateNestedManyWithoutAwardsBodyInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsBodyInput>, Enumerable<AwardUncheckedCreateWithoutAwardsBodyInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsBodyInput>
    createMany?: AwardCreateManyAwardsBodyInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
  }

  export type AwardUpdateManyWithoutAwardsBodyInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsBodyInput>, Enumerable<AwardUncheckedCreateWithoutAwardsBodyInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsBodyInput>
    upsert?: Enumerable<AwardUpsertWithWhereUniqueWithoutAwardsBodyInput>
    createMany?: AwardCreateManyAwardsBodyInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
    set?: Enumerable<AwardWhereUniqueInput>
    disconnect?: Enumerable<AwardWhereUniqueInput>
    delete?: Enumerable<AwardWhereUniqueInput>
    update?: Enumerable<AwardUpdateWithWhereUniqueWithoutAwardsBodyInput>
    updateMany?: Enumerable<AwardUpdateManyWithWhereWithoutAwardsBodyInput>
    deleteMany?: Enumerable<AwardScalarWhereInput>
  }

  export type AwardUncheckedUpdateManyWithoutAwardsBodyInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsBodyInput>, Enumerable<AwardUncheckedCreateWithoutAwardsBodyInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsBodyInput>
    upsert?: Enumerable<AwardUpsertWithWhereUniqueWithoutAwardsBodyInput>
    createMany?: AwardCreateManyAwardsBodyInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
    set?: Enumerable<AwardWhereUniqueInput>
    disconnect?: Enumerable<AwardWhereUniqueInput>
    delete?: Enumerable<AwardWhereUniqueInput>
    update?: Enumerable<AwardUpdateWithWhereUniqueWithoutAwardsBodyInput>
    updateMany?: Enumerable<AwardUpdateManyWithWhereWithoutAwardsBodyInput>
    deleteMany?: Enumerable<AwardScalarWhereInput>
  }

  export type AwardCreateNestedManyWithoutAwardsCategoryInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsCategoryInput>, Enumerable<AwardUncheckedCreateWithoutAwardsCategoryInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsCategoryInput>
    createMany?: AwardCreateManyAwardsCategoryInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
  }

  export type AwardUncheckedCreateNestedManyWithoutAwardsCategoryInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsCategoryInput>, Enumerable<AwardUncheckedCreateWithoutAwardsCategoryInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsCategoryInput>
    createMany?: AwardCreateManyAwardsCategoryInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
  }

  export type AwardUpdateManyWithoutAwardsCategoryInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsCategoryInput>, Enumerable<AwardUncheckedCreateWithoutAwardsCategoryInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsCategoryInput>
    upsert?: Enumerable<AwardUpsertWithWhereUniqueWithoutAwardsCategoryInput>
    createMany?: AwardCreateManyAwardsCategoryInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
    set?: Enumerable<AwardWhereUniqueInput>
    disconnect?: Enumerable<AwardWhereUniqueInput>
    delete?: Enumerable<AwardWhereUniqueInput>
    update?: Enumerable<AwardUpdateWithWhereUniqueWithoutAwardsCategoryInput>
    updateMany?: Enumerable<AwardUpdateManyWithWhereWithoutAwardsCategoryInput>
    deleteMany?: Enumerable<AwardScalarWhereInput>
  }

  export type AwardUncheckedUpdateManyWithoutAwardsCategoryInput = {
    create?: XOR<Enumerable<AwardCreateWithoutAwardsCategoryInput>, Enumerable<AwardUncheckedCreateWithoutAwardsCategoryInput>>
    connectOrCreate?: Enumerable<AwardCreateOrConnectWithoutAwardsCategoryInput>
    upsert?: Enumerable<AwardUpsertWithWhereUniqueWithoutAwardsCategoryInput>
    createMany?: AwardCreateManyAwardsCategoryInputEnvelope
    connect?: Enumerable<AwardWhereUniqueInput>
    set?: Enumerable<AwardWhereUniqueInput>
    disconnect?: Enumerable<AwardWhereUniqueInput>
    delete?: Enumerable<AwardWhereUniqueInput>
    update?: Enumerable<AwardUpdateWithWhereUniqueWithoutAwardsCategoryInput>
    updateMany?: Enumerable<AwardUpdateManyWithWhereWithoutAwardsCategoryInput>
    deleteMany?: Enumerable<AwardScalarWhereInput>
  }

  export type AwardsBodyCreateNestedOneWithoutAwardsInput = {
    create?: XOR<AwardsBodyCreateWithoutAwardsInput, AwardsBodyUncheckedCreateWithoutAwardsInput>
    connectOrCreate?: AwardsBodyCreateOrConnectWithoutAwardsInput
    connect?: AwardsBodyWhereUniqueInput
  }

  export type AwardsCategoryCreateNestedOneWithoutAwardsInput = {
    create?: XOR<AwardsCategoryCreateWithoutAwardsInput, AwardsCategoryUncheckedCreateWithoutAwardsInput>
    connectOrCreate?: AwardsCategoryCreateOrConnectWithoutAwardsInput
    connect?: AwardsCategoryWhereUniqueInput
  }

  export type AwardsBodyUpdateOneRequiredWithoutAwardsInput = {
    create?: XOR<AwardsBodyCreateWithoutAwardsInput, AwardsBodyUncheckedCreateWithoutAwardsInput>
    connectOrCreate?: AwardsBodyCreateOrConnectWithoutAwardsInput
    upsert?: AwardsBodyUpsertWithoutAwardsInput
    connect?: AwardsBodyWhereUniqueInput
    update?: XOR<AwardsBodyUpdateWithoutAwardsInput, AwardsBodyUncheckedUpdateWithoutAwardsInput>
  }

  export type AwardsCategoryUpdateOneRequiredWithoutAwardsInput = {
    create?: XOR<AwardsCategoryCreateWithoutAwardsInput, AwardsCategoryUncheckedCreateWithoutAwardsInput>
    connectOrCreate?: AwardsCategoryCreateOrConnectWithoutAwardsInput
    upsert?: AwardsCategoryUpsertWithoutAwardsInput
    connect?: AwardsCategoryWhereUniqueInput
    update?: XOR<AwardsCategoryUpdateWithoutAwardsInput, AwardsCategoryUncheckedUpdateWithoutAwardsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringFilter
    _max?: NestedStringFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _avg?: NestedFloatFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    sum?: NestedIntFilter
    _min?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedIntFilter
    _max?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    count?: NestedIntFilter
    _min?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    min?: NestedBoolFilter
    _max?: NestedBoolFilter
    /**
     * @deprecated since 2.23 because Aggregation keywords got unified to use underscore as prefix to prevent field clashes.
     * 
    **/
    max?: NestedBoolFilter
  }

  export type NominationCreateWithoutMovieInput = {
    id?: string
    winner?: boolean
    person: PersonCreateNestedOneWithoutNominationsInput
  }

  export type NominationUncheckedCreateWithoutMovieInput = {
    id?: string
    winner?: boolean
    personId: string
  }

  export type NominationCreateOrConnectWithoutMovieInput = {
    where: NominationWhereUniqueInput
    create: XOR<NominationCreateWithoutMovieInput, NominationUncheckedCreateWithoutMovieInput>
  }

  export type NominationCreateManyMovieInputEnvelope = {
    data: Enumerable<NominationCreateManyMovieInput>
    skipDuplicates?: boolean
  }

  export type NominationUpsertWithWhereUniqueWithoutMovieInput = {
    where: NominationWhereUniqueInput
    update: XOR<NominationUpdateWithoutMovieInput, NominationUncheckedUpdateWithoutMovieInput>
    create: XOR<NominationCreateWithoutMovieInput, NominationUncheckedCreateWithoutMovieInput>
  }

  export type NominationUpdateWithWhereUniqueWithoutMovieInput = {
    where: NominationWhereUniqueInput
    data: XOR<NominationUpdateWithoutMovieInput, NominationUncheckedUpdateWithoutMovieInput>
  }

  export type NominationUpdateManyWithWhereWithoutMovieInput = {
    where: NominationScalarWhereInput
    data: XOR<NominationUpdateManyMutationInput, NominationUncheckedUpdateManyWithoutNominationsInput>
  }

  export type NominationScalarWhereInput = {
    AND?: Enumerable<NominationScalarWhereInput>
    OR?: Enumerable<NominationScalarWhereInput>
    NOT?: Enumerable<NominationScalarWhereInput>
    id?: StringFilter | string
    winner?: BoolFilter | boolean
    personId?: StringFilter | string
    movieId?: StringFilter | string
  }

  export type NominationCreateWithoutPersonInput = {
    id?: string
    winner?: boolean
    movie: MovieCreateNestedOneWithoutNominationsInput
  }

  export type NominationUncheckedCreateWithoutPersonInput = {
    id?: string
    winner?: boolean
    movieId: string
  }

  export type NominationCreateOrConnectWithoutPersonInput = {
    where: NominationWhereUniqueInput
    create: XOR<NominationCreateWithoutPersonInput, NominationUncheckedCreateWithoutPersonInput>
  }

  export type NominationCreateManyPersonInputEnvelope = {
    data: Enumerable<NominationCreateManyPersonInput>
    skipDuplicates?: boolean
  }

  export type NominationUpsertWithWhereUniqueWithoutPersonInput = {
    where: NominationWhereUniqueInput
    update: XOR<NominationUpdateWithoutPersonInput, NominationUncheckedUpdateWithoutPersonInput>
    create: XOR<NominationCreateWithoutPersonInput, NominationUncheckedCreateWithoutPersonInput>
  }

  export type NominationUpdateWithWhereUniqueWithoutPersonInput = {
    where: NominationWhereUniqueInput
    data: XOR<NominationUpdateWithoutPersonInput, NominationUncheckedUpdateWithoutPersonInput>
  }

  export type NominationUpdateManyWithWhereWithoutPersonInput = {
    where: NominationScalarWhereInput
    data: XOR<NominationUpdateManyMutationInput, NominationUncheckedUpdateManyWithoutNominationsInput>
  }

  export type PersonCreateWithoutNominationsInput = {
    id?: string
    wikiUrl: string
    name: string
  }

  export type PersonUncheckedCreateWithoutNominationsInput = {
    id?: string
    wikiUrl: string
    name: string
  }

  export type PersonCreateOrConnectWithoutNominationsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutNominationsInput, PersonUncheckedCreateWithoutNominationsInput>
  }

  export type MovieCreateWithoutNominationsInput = {
    id?: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl?: string | null
  }

  export type MovieUncheckedCreateWithoutNominationsInput = {
    id?: string
    wikiUrl: string
    title: string
    year: number
    imdbUrl?: string | null
  }

  export type MovieCreateOrConnectWithoutNominationsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutNominationsInput, MovieUncheckedCreateWithoutNominationsInput>
  }

  export type PersonUpsertWithoutNominationsInput = {
    update: XOR<PersonUpdateWithoutNominationsInput, PersonUncheckedUpdateWithoutNominationsInput>
    create: XOR<PersonCreateWithoutNominationsInput, PersonUncheckedCreateWithoutNominationsInput>
  }

  export type PersonUpdateWithoutNominationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PersonUncheckedUpdateWithoutNominationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieUpsertWithoutNominationsInput = {
    update: XOR<MovieUpdateWithoutNominationsInput, MovieUncheckedUpdateWithoutNominationsInput>
    create: XOR<MovieCreateWithoutNominationsInput, MovieUncheckedCreateWithoutNominationsInput>
  }

  export type MovieUpdateWithoutNominationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MovieUncheckedUpdateWithoutNominationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wikiUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    imdbUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AwardCreateWithoutAwardsBodyInput = {
    id?: string
    year: string
    awardsCategory: AwardsCategoryCreateNestedOneWithoutAwardsInput
  }

  export type AwardUncheckedCreateWithoutAwardsBodyInput = {
    id?: string
    year: string
    awardsCategoryId: string
  }

  export type AwardCreateOrConnectWithoutAwardsBodyInput = {
    where: AwardWhereUniqueInput
    create: XOR<AwardCreateWithoutAwardsBodyInput, AwardUncheckedCreateWithoutAwardsBodyInput>
  }

  export type AwardCreateManyAwardsBodyInputEnvelope = {
    data: Enumerable<AwardCreateManyAwardsBodyInput>
    skipDuplicates?: boolean
  }

  export type AwardUpsertWithWhereUniqueWithoutAwardsBodyInput = {
    where: AwardWhereUniqueInput
    update: XOR<AwardUpdateWithoutAwardsBodyInput, AwardUncheckedUpdateWithoutAwardsBodyInput>
    create: XOR<AwardCreateWithoutAwardsBodyInput, AwardUncheckedCreateWithoutAwardsBodyInput>
  }

  export type AwardUpdateWithWhereUniqueWithoutAwardsBodyInput = {
    where: AwardWhereUniqueInput
    data: XOR<AwardUpdateWithoutAwardsBodyInput, AwardUncheckedUpdateWithoutAwardsBodyInput>
  }

  export type AwardUpdateManyWithWhereWithoutAwardsBodyInput = {
    where: AwardScalarWhereInput
    data: XOR<AwardUpdateManyMutationInput, AwardUncheckedUpdateManyWithoutAwardsInput>
  }

  export type AwardScalarWhereInput = {
    AND?: Enumerable<AwardScalarWhereInput>
    OR?: Enumerable<AwardScalarWhereInput>
    NOT?: Enumerable<AwardScalarWhereInput>
    id?: StringFilter | string
    year?: StringFilter | string
    awardsBodyId?: StringFilter | string
    awardsCategoryId?: StringFilter | string
  }

  export type AwardCreateWithoutAwardsCategoryInput = {
    id?: string
    year: string
    awardsBody: AwardsBodyCreateNestedOneWithoutAwardsInput
  }

  export type AwardUncheckedCreateWithoutAwardsCategoryInput = {
    id?: string
    year: string
    awardsBodyId: string
  }

  export type AwardCreateOrConnectWithoutAwardsCategoryInput = {
    where: AwardWhereUniqueInput
    create: XOR<AwardCreateWithoutAwardsCategoryInput, AwardUncheckedCreateWithoutAwardsCategoryInput>
  }

  export type AwardCreateManyAwardsCategoryInputEnvelope = {
    data: Enumerable<AwardCreateManyAwardsCategoryInput>
    skipDuplicates?: boolean
  }

  export type AwardUpsertWithWhereUniqueWithoutAwardsCategoryInput = {
    where: AwardWhereUniqueInput
    update: XOR<AwardUpdateWithoutAwardsCategoryInput, AwardUncheckedUpdateWithoutAwardsCategoryInput>
    create: XOR<AwardCreateWithoutAwardsCategoryInput, AwardUncheckedCreateWithoutAwardsCategoryInput>
  }

  export type AwardUpdateWithWhereUniqueWithoutAwardsCategoryInput = {
    where: AwardWhereUniqueInput
    data: XOR<AwardUpdateWithoutAwardsCategoryInput, AwardUncheckedUpdateWithoutAwardsCategoryInput>
  }

  export type AwardUpdateManyWithWhereWithoutAwardsCategoryInput = {
    where: AwardScalarWhereInput
    data: XOR<AwardUpdateManyMutationInput, AwardUncheckedUpdateManyWithoutAwardsInput>
  }

  export type AwardsBodyCreateWithoutAwardsInput = {
    id?: string
    name: string
  }

  export type AwardsBodyUncheckedCreateWithoutAwardsInput = {
    id?: string
    name: string
  }

  export type AwardsBodyCreateOrConnectWithoutAwardsInput = {
    where: AwardsBodyWhereUniqueInput
    create: XOR<AwardsBodyCreateWithoutAwardsInput, AwardsBodyUncheckedCreateWithoutAwardsInput>
  }

  export type AwardsCategoryCreateWithoutAwardsInput = {
    id?: string
    name: string
  }

  export type AwardsCategoryUncheckedCreateWithoutAwardsInput = {
    id?: string
    name: string
  }

  export type AwardsCategoryCreateOrConnectWithoutAwardsInput = {
    where: AwardsCategoryWhereUniqueInput
    create: XOR<AwardsCategoryCreateWithoutAwardsInput, AwardsCategoryUncheckedCreateWithoutAwardsInput>
  }

  export type AwardsBodyUpsertWithoutAwardsInput = {
    update: XOR<AwardsBodyUpdateWithoutAwardsInput, AwardsBodyUncheckedUpdateWithoutAwardsInput>
    create: XOR<AwardsBodyCreateWithoutAwardsInput, AwardsBodyUncheckedCreateWithoutAwardsInput>
  }

  export type AwardsBodyUpdateWithoutAwardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsBodyUncheckedUpdateWithoutAwardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsCategoryUpsertWithoutAwardsInput = {
    update: XOR<AwardsCategoryUpdateWithoutAwardsInput, AwardsCategoryUncheckedUpdateWithoutAwardsInput>
    create: XOR<AwardsCategoryCreateWithoutAwardsInput, AwardsCategoryUncheckedCreateWithoutAwardsInput>
  }

  export type AwardsCategoryUpdateWithoutAwardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AwardsCategoryUncheckedUpdateWithoutAwardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NominationCreateManyMovieInput = {
    id?: string
    winner?: boolean
    personId: string
  }

  export type NominationUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    person?: PersonUpdateOneRequiredWithoutNominationsInput
  }

  export type NominationUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type NominationUncheckedUpdateManyWithoutNominationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
  }

  export type NominationCreateManyPersonInput = {
    id?: string
    winner?: boolean
    movieId: string
  }

  export type NominationUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    movie?: MovieUpdateOneRequiredWithoutNominationsInput
  }

  export type NominationUncheckedUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    winner?: BoolFieldUpdateOperationsInput | boolean
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type AwardCreateManyAwardsBodyInput = {
    id?: string
    year: string
    awardsCategoryId: string
  }

  export type AwardUpdateWithoutAwardsBodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsCategory?: AwardsCategoryUpdateOneRequiredWithoutAwardsInput
  }

  export type AwardUncheckedUpdateWithoutAwardsBodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsCategoryId?: StringFieldUpdateOperationsInput | string
  }

  export type AwardUncheckedUpdateManyWithoutAwardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsCategoryId?: StringFieldUpdateOperationsInput | string
  }

  export type AwardCreateManyAwardsCategoryInput = {
    id?: string
    year: string
    awardsBodyId: string
  }

  export type AwardUpdateWithoutAwardsCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsBody?: AwardsBodyUpdateOneRequiredWithoutAwardsInput
  }

  export type AwardUncheckedUpdateWithoutAwardsCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    awardsBodyId?: StringFieldUpdateOperationsInput | string
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
  export const dmmf: runtime.DMMF.Document;
}