import type { ModuleMetadata } from "@nestjs/common";
import type { ModuleOptions } from "./ModuleOptions";

export interface ModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => Promise<ModuleOptions> | ModuleOptions;
  providerName?: symbol;
  inject?: any[];
}
