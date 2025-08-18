import { useState, useCallback } from "react";
import { EstablishmentService } from "../services/establishmentService";
import type {
  CreateEstablishmentData,
  UpdateEstablishmentData,
} from "../types/establishment";
import { useAuth } from "./useAuth";

export const useEstablishment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const createEstablishment = useCallback(
    async (data: CreateEstablishmentData) => {
      if (!user?.uid) {
        throw new Error("Usuário não autenticado");
      }

      setLoading(true);
      setError(null);

      try {
        const establishmentId = await EstablishmentService.createEstablishment(
          data,
          user.uid
        );
        return establishmentId;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid]
  );

  const getUserEstablishments = useCallback(async () => {
    if (!user?.uid) {
      throw new Error("Usuário não autenticado");
    }

    setLoading(true);
    setError(null);

    try {
      const establishments = await EstablishmentService.getUserEstablishments(
        user.uid
      );
      return establishments;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  const getEstablishment = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const establishment = await EstablishmentService.getEstablishment(id);
      return establishment;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEstablishment = useCallback(
    async (id: string, data: UpdateEstablishmentData) => {
      if (!user?.uid) {
        throw new Error("Usuário não autenticado");
      }

      setLoading(true);
      setError(null);
      try {
        await EstablishmentService.updateEstablishment(id, data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid]
  );

  const checkCNPJExists = useCallback(async (cnpjCpf: string) => {
    setLoading(true);
    setError(null);

    try {
      const exists = await EstablishmentService.checkCNPJExists(cnpjCpf);
      return exists;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEstablishment = useCallback(
    async (id: string) => {
      if (!user?.uid) {
        throw new Error("Usuário não autenticado");
      }

      setLoading(true);
      setError(null);

      try {
        await EstablishmentService.deleteEstablishment(id);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid]
  );

  return {
    loading,
    error,
    createEstablishment,
    getUserEstablishments,
    getEstablishment,
    updateEstablishment,
    checkCNPJExists,
    deleteEstablishment,
  };
};
