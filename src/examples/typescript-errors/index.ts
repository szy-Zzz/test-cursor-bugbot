// TypeScript错误示例文件
// 专门展示各种常见的TS类型错误

// ❌ TS2304: Cannot find name 'xxx'
function useUndefinedType() {
    const user: UndefinedUserType = { name: 'John' }; // 未定义的类型
    return unknownFunction(user); // 未定义的函数
}

// ❌ TS2322: Type 'string' is not assignable to type 'number'
interface UserConfig {
    id: number;
    name: string;
    active: boolean;
}

const userConfig: UserConfig = {
    id: "123", // 错误：字符串赋值给数字类型
    name: 123, // 错误：数字赋值给字符串类型
    active: "true" // 错误：字符串赋值给布尔类型
};

// ❌ TS2339: Property 'xxx' does not exist on type 'yyy'
interface User {
    id: number;
    name: string;
}

function processUser(user: User) {
    console.log(user.email); // 错误：User接口上不存在email属性
    return user.isActive; // 错误：User接口上不存在isActive属性
}

// ❌ TS2345: Argument of type 'xxx' is not assignable to parameter of type 'yyy'
function calculateTotal(prices: number[]): number {
    return prices.reduce((sum, price) => sum + price, 0);
}

const stringPrices = ["10", "20", "30"];
const total = calculateTotal(stringPrices); // 错误：string[]不能赋值给number[]

// ❌ TS2531: Object is possibly 'null' or 'undefined'
interface ApiResponse {
    data?: {
        user: {
            name: string;
            email: string;
        };
    };
}

function handleApiResponse(response: ApiResponse) {
    // 错误：data可能为undefined
    const userName = response.data.user.name;
    const userEmail = response.data.user.email;
    
    return { userName, userEmail };
}

// ❌ TS2741: Property 'xxx' is missing in type 'yyy' but required in type 'zzz'
interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

function createUser(userData: CreateUserRequest) {
    // 处理用户创建逻辑
    return userData;
}

// 错误：缺少必需的属性
const newUser = createUser({
    name: "John",
    email: "john@example.com"
    // 缺少password和role属性
});

// ❌ TS2571: Object is of type 'unknown'
function processApiData(data: unknown) {
    // 错误：unknown类型不能直接访问属性
    console.log(data.id);
    console.log(data.name);
    
    // 错误：unknown类型不能调用方法
    return data.toString();
}

// ❌ TS2769: No overload matches this call
interface EventHandler {
    (event: MouseEvent): void;
    (event: KeyboardEvent): void;
}

const handleEvent: EventHandler = (event) => {
    console.log(event.type);
};

// 错误：传入了不匹配的事件类型
handleEvent(new TouchEvent('touchstart'));

// ❌ TS2540: Cannot assign to 'xxx' because it is a read-only property
interface ReadOnlyUser {
    readonly id: number;
    readonly createdAt: Date;
    name: string;
}

function updateUser(user: ReadOnlyUser) {
    user.id = 456; // 错误：不能修改只读属性
    user.createdAt = new Date(); // 错误：不能修改只读属性
    user.name = "Updated Name"; // 正确：可以修改非只读属性
}

// ❌ TS2564: Property 'xxx' has no initializer and is not definitely assigned in the constructor
class UserService {
    private apiUrl: string; // 错误：没有初始化且构造函数中未赋值
    private timeout: number; // 错误：没有初始化
    
    constructor(baseUrl: string) {
        // 忘记初始化apiUrl和timeout
    }
    
    async fetchUser(id: number) {
        const response = await fetch(`${this.apiUrl}/users/${id}`);
        return response.json();
    }
}

// ❌ TS2493: Tuple type 'xxx' of length 'n' has no element at index 'm'
type UserTuple = [string, number, boolean];

function processTuple(data: UserTuple) {
    const name = data[0]; // 正确
    const age = data[1]; // 正确
    const active = data[2]; // 正确
    const extra = data[3]; // 错误：元组只有3个元素，索引3不存在
}

// ❌ TS2355: A function whose declared type is neither 'void' nor 'any' must return a value
function calculateDiscount(price: number, discountRate: number): number {
    if (price > 100) {
        return price * discountRate;
    }
    // 错误：函数声明返回number，但某些路径没有返回值
}

// ❌ TS2367: This condition will always return 'xxx' since the types 'yyy' and 'zzz' have no overlap
function checkUserType(user: { type: 'admin' | 'user' }) {
    if (user.type === 'guest') { // 错误：'guest'不在联合类型中
        return 'guest access';
    }
    
    if (user.type === 'admin' && user.type === 'user') { // 错误：条件永远为false
        return 'impossible';
    }
}

// ❌ TS2590: Expression produces a union type that is too complex to represent
type ComplexUnion = 
    | { type: 'A'; value: string }
    | { type: 'B'; value: number }
    | { type: 'C'; value: boolean }
    | { type: 'D'; value: Date }
    | { type: 'E'; value: RegExp };

// 创建过于复杂的类型组合可能导致此错误
function processComplexType(data: ComplexUnion): ComplexUnion {
    // 复杂的类型操作...
    return data;
} 