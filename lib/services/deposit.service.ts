import { collection, doc, getDocs, deleteDoc, addDoc, Firestore } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { firestore } from '@/config/firebaseConfig';
import { Deposit } from '../models/deposit.model';

class DepositService {
  private _deposits$ = new BehaviorSubject<Deposit[]>([]);
  static deposits$: any;
  firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  async addDeposit(deposit: Deposit) {
    const docRef = await addDoc(collection(firestore, 'deposits'), deposit);
    const newDeposit = { ...deposit, id: docRef.id };
    this._deposits$.next([...this._deposits$.value, newDeposit]);
  }

  getAllDeposits(): Observable<Deposit[]> {
    return new Observable<Deposit[]>((observer) => {
      getDocs(collection(firestore, 'deposits'))
        .then((querySnapshot) => {
          const deposits: Deposit[] = [];
          querySnapshot.forEach((doc) => {
            deposits.push({ id: doc.id, ...doc.data() } as Deposit);
          });
          observer.next(deposits);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteDeposits(ids: string[]): Observable<void> {
    return new Observable<void>((observer) => {
      const deletionPromises: Promise<void>[] = [];

      ids.forEach((id) => {
        deletionPromises.push(deleteDoc(doc(firestore, 'deposits', id)));
      });

      Promise.all(deletionPromises)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}

export default DepositService;