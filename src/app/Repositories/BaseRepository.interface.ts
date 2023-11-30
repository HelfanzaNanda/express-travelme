import { Includeable } from "sequelize";

// interface 

interface BaseRepositoryInterface {
    all(attributes?: string[], relations? : Includeable[]): Promise<any[]>;
  
    findById(id: number, attributes?: string[]): Promise<any>;
  
    create(data: any): Promise<any>;
  
    update(id: number, data: any): Promise<any>;
  
    delete(id: number): Promise<boolean>;

    datatables(attributes?: string[], relations? : Includeable[]): Promise<any[]>;

  }
  
  export { BaseRepositoryInterface };