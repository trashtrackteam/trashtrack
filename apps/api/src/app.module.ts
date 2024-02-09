import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";

import { UserModule } from "./model/user/user.module";
import { TrashBinModule } from "./model/trash-bin/trash-bin.module";
import { SubTrashBinModule } from "./model/sub-trash-bin/sub-trash-bin.module";
import { TrashModule } from "./model/trash/trash.module";
import { HistoryModule } from "./model/history/history.module";
import { ReportModule } from "./model/report/report.module";

@Module({
    imports: [ConfigModule, UserModule, TrashBinModule, SubTrashBinModule, TrashModule, HistoryModule, ReportModule],
})
export class AppModule {}
