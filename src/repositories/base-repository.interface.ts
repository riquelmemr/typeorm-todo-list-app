interface IBaseRepository<T> {
  create(item: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  getByOne(key: string, value: string): Promise<T | null>;
  update(id: string, item: any): Promise<T | null>;
  delete(key: string, value: string): Promise<void>;
}

export { IBaseRepository };

