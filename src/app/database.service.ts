import { Database, ref, set, update, remove, get, objectVal } from '@angular/fire/database';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private db: Database) {}

    get(path: string) {
        const itemRef = ref(this.db, path);
        return objectVal(itemRef);
      }
    
      set(path: string, value: any) {
        const itemRef = ref(this.db, path);
        return set(itemRef, value);
      }
    
      update(path: string, value: any) {
        const itemRef = ref(this.db, path);
        return update(itemRef, value);
      }
    
      delete(path: string) {
        const itemRef = ref(this.db, path);
        return remove(itemRef);
      }
}