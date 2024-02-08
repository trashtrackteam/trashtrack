import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";

import { UserModule } from "./model/user/user.module";
import { TrashBinModule } from "./model/trash-bin/trash-bin.module";
import { SubTrashBinModule } from "./model/sub-trash-bin/sub-trash-bin.module";

@Module({
    imports: [ConfigModule, UserModule, TrashBinModule, SubTrashBinModule],
})
export class AppModule {}
