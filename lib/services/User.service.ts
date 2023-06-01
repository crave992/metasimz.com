import { Observable } from 'rxjs';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../../models/User.model';
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';

export class UserService {
  private readonly collectionName = 'users';
  private readonly storagePath = 'profilePictures';

  constructor(public firestore: Firestore) {}

  getUserById(id: string): Observable<User> {
    const userRef = doc(this.firestore, this.collectionName, id);
    return new Observable<User>((observer) => {
      getDoc(userRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const user = { id: docSnapshot.id, ...docSnapshot.data() } as User;
          observer.next(user);
        } else {
          observer.error(new Error(`User with ID ${id} not found`));
        }
        observer.complete();
      });
    });
  }

  updateUserById(id: string, user: User): Observable<User> {
    const userRef = doc(this.firestore, this.collectionName, id);
    return new Observable<User>((observer) => {
      setDoc(userRef, user).then(() => {
        observer.next(user);
        observer.complete();
      }).catch((error) => {
        observer.error(new Error(`Error updating user with ID ${id}: ${error}`));
        observer.complete();
      });
    });
  }

  uploadProfilePictures(image: File): Observable<string> {
    const storage = getStorage();
    const storageRef: StorageReference = ref(storage, `${this.storagePath}/${image.name}`);
    return new Observable<string>((observer) => {
      uploadBytes(storageRef, image).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(snapshot.ref);
        observer.next(downloadUrl);
        observer.complete();
      }).catch((error) => {
        observer.error(new Error(`Error uploading profile image: ${error}`));
        observer.complete();
      });
    });
  }
}