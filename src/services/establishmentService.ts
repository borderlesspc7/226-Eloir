import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebaseconfig";
import type {
  Establishment,
  CreateEstablishmentData,
  UpdateEstablishmentData,
  EstablishmentFilters,
} from "../types/establishment";
import { StorageService } from "./storageService";

const COLLECTION_NAME = "establishments";

export class EstablishmentService {
  static async createEstablishment(
    data: CreateEstablishmentData,
    userId: string
  ): Promise<Establishment | string> {
    try {
      const establishmentData = {
        name: data.name,
        cnpjCpf: data.cnpjCpf,
        adress: data.adress,
        category: data.category,
        productsServices: data.productsServices,
        plan: data.plan,
        documents: [],
        status: "pending" as const,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: userId,
      };

      const docRef = await addDoc(
        collection(db, COLLECTION_NAME),
        establishmentData
      );
      const establishmentId = docRef.id;

      if (data.documents && data.documents.length > 0) {
        const uploadedDocuments = await StorageService.uploadMultipleDocuments(
          data.documents,
          establishmentId,
          userId
        );

        await updateDoc(doc(db, COLLECTION_NAME, establishmentId), {
          documents: uploadedDocuments,
          updatedAt: serverTimestamp(),
        });
      }
      return establishmentId;
    } catch (error) {
      console.error("Erro ao criar estabelecimento:", error);
      throw new Error("Erro ao criar estabelecimento");
    }
  }

  static async getEstablishment(id: string): Promise<Establishment | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as Establishment;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar estabelecimento:", error);
      throw new Error("Erro ao buscar estabelecimento");
    }
  }

  static async getUserEstablishments(userId: string): Promise<Establishment[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Establishment[];
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos do usuário:", error);
      throw new Error("Erro ao buscar estabelecimentos do usuário");
    }
  }

  static async getAllEstablishments(
    filters?: EstablishmentFilters
  ): Promise<Establishment[]> {
    try {
      let q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );

      if (filters) {
        if (filters.category) {
          q = query(q, where("category", "==", filters.category));
        }
        if (filters.state) {
          q = query(q, where("adress.state", "==", filters.state));
        }
        if (filters.city) {
          q = query(q, where("adress.city", "==", filters.city));
        }
        if (filters.status) {
          q = query(q, where("status", "==", filters.status));
        }
        if (filters.userId) {
          q = query(q, where("userId", "==", filters.userId));
        }
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Establishment[];
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos:", error);
      throw new Error("Erro ao buscar estabelecimentos");
    }
  }

  static async updateEstablishment(
    id: string,
    data: UpdateEstablishmentData
  ): Promise<void> {
    try {
      const updateData: any = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      if (data.documents && data.documents.length > 0) {
        const establishment = await this.getEstablishment(id);
        if (establishment) {
          const uploadedDocuments =
            await StorageService.uploadMultipleDocuments(
              data.documents,
              id,
              establishment.userId
            );

          const existingDocs = establishment.documents || [];
          updateData.documents = [...existingDocs, ...uploadedDocuments];
        }
      }

      if (!updateData.documents) {
        delete updateData.documents;
      }

      await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
    } catch (error) {
      console.error("Erro ao atualizar estabelecimento:", error);
      throw new Error("Erro ao atualizar estabelecimento");
    }
  }

  static async updateEstablishmentStatus(
    id: string,
    status: "pending" | "approved" | "rejected"
  ): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao atualizar status do estabelecimento:", error);
      throw new Error("Erro ao atualizar status do estabelecimento");
    }
  }

  static async checkCNPJExists(cnpjCpf: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("cnpjCpf", "==", cnpjCpf)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Erro ao verificar existência do CNPJ:", error);
      throw new Error("Erro ao verificar existência do CNPJ");
    }
  }

  static async deleteEstablishment(id: string): Promise<void> {
    try {
      const establishment = await this.getEstablishment(id);
      if (establishment) {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
      }
    } catch (error) {
      console.error("Erro ao deletar estabelecimento:", error);
      throw new Error("Erro ao deletar estabelecimento");
    }
  }
}
