import { DataSource } from "typeorm";
import config from "./ormconfig";

class TypeORMProvider {
   static client: DataSource;

   static async connect(): Promise<void> {
      this.client = new DataSource(config);
      await this.client.initialize();
   }

   static async disconnect(): Promise<void> {
      await this.client.destroy();
   }
}

export default TypeORMProvider;