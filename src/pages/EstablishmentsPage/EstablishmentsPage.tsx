"use client";

import { useState, useMemo } from "react";
import type { EstablishmentListFilters } from "../../types/establishment";
import { mockEstablishments } from "../../mock/establishment";
import { FilterBar } from "./FilterBar/FilterBar";
import { EstablishmentCard } from "./EstablishmentCard/EstablishmentCard";
import "./EstablishmentsPage.css";

export default function EstablishmentListPage() {
  const [filters, setFilters] = useState<EstablishmentListFilters>({
    search: "",
    category: "",
    country: "",
    state: "",
    city: "",
    sortBy: "name",
  });

  const filteredEstablishments = useMemo(() => {
    let filtered = [...mockEstablishments];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (est) =>
          est.name.toLowerCase().includes(searchLower) ||
          est.productsServices.some((product) =>
            product.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((est) => est.category === filters.category);
    }

    // Apply location filters
    if (filters.country) {
      filtered = filtered.filter(
        (est) => est.adress.country === filters.country
      );
    }

    if (filters.state) {
      filtered = filtered.filter((est) => est.adress.state === filters.state);
    }

    if (filters.city) {
      filtered = filtered.filter((est) => est.adress.city === filters.city);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters]);

  const handleViewDetails = (id: string) => {
    // TODO: Navigate to establishment details page
    console.log("View details for establishment:", id);
    alert(`Funcionalidade em desenvolvimento. ID: ${id}`);
  };

  return (
    <div className="establishment-list-page">
      <div className="establishment-list-container">
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          totalResults={filteredEstablishments.length}
        />

        {filteredEstablishments.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Nenhum estabelecimento encontrado</h3>
            <p>Tente ajustar os filtros ou buscar por outros termos.</p>
          </div>
        ) : (
          <div className="establishments-grid">
            {filteredEstablishments.map((establishment) => (
              <EstablishmentCard
                key={establishment.id}
                establishment={establishment}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
