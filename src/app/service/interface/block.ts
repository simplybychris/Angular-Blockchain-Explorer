import {Transaction} from "./transaction";

export interface Block{
index?: number;
timestamp?: number;
lastHash?: string;
hash?: string;
data?: Transaction[];
nonce?: number;
difficulty?: number;
}
