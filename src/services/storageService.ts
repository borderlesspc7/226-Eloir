import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../lib/firebaseconfig";
import type { DocumentFile } from "../types/establishment";

const storage = getStorage(app);

export class StorageService {
  static async uploadDocument(
    file: File,
    establishmentId: string,
    userId: string
  ): Promise<DocumentFile> {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(
      storage,
      `establishments/${establishmentId}/documents/${userId}/${fileName}`
    );

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      id: snapshot.ref.name,
      name: file.name,
      url: downloadURL,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
    };
  }

  static async uploadMultipleDocuments(
    files: File[],
    establishmentId: string,
    userId: string
  ): Promise<DocumentFile[]> {
    const uploadPromises = files.map((file) =>
      this.uploadDocument(file, establishmentId, userId)
    );

    return Promise.all(uploadPromises);
  }

  static async deleteDocument(
    documentId: string,
    establishmentId: string
  ): Promise<void> {
    const storageRef = ref(
      storage,
      `establishments/${establishmentId}/documents/${documentId}`
    );
    await deleteObject(storageRef);
  }
}
