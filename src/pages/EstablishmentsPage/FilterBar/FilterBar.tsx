import type { EstablishmentListFilters } from "../../../types/establishment";
import { TextInput } from "../../../components/ui/TextInput/TextInput";
import { Dropdown } from "../../../components/RegisterPlace/Dropdown/Dropdown";
import "./FilterBar.css";

interface FilterBarProps {
  filters: EstablishmentListFilters;
  onFiltersChange: (filters: EstablishmentListFilters) => void;
  totalResults: number;
}

const categories = [
  "Todas as categorias",
  "Restaurante",
  "Loja de Roupas",
  "Farmácia",
  "Supermercado",
  "Salão de Beleza",
  "Oficina Mecânica",
  "Padaria",
  "Pet Shop",
  "Academia",
  "Consultório Médico",
];

const countries = ["Todos os países", "Brasil", "Argentina", "Chile"];
const states = [
  "Todos os estados",
  "São Paulo",
  "Rio de Janeiro",
  "Minas Gerais",
  "Bahia",
  "Rio Grande do Sul",
];
const cities = [
  "Todas as cidades",
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Salvador",
  "Porto Alegre",
  "Campinas",
];
const sortOptions = [
  { value: "name", label: "Nome (A-Z)" },
  { value: "rating", label: "Melhor avaliação" },
  { value: "newest", label: "Mais recentes" },
];

export function FilterBar({
  filters,
  onFiltersChange,
  totalResults,
}: FilterBarProps) {
  const updateFilter = (key: keyof EstablishmentListFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "",
      country: "",
      state: "",
      city: "",
      sortBy: "name",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.country ||
    filters.state ||
    filters.city;

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <h2>Estabelecimentos Próximos</h2>
        <span className="results-count">
          {totalResults} estabelecimentos encontrados
        </span>
      </div>

      <div className="search-section">
        <TextInput
          label="Buscar estabelecimentos"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Digite o nome do estabelecimento..."
        />
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <Dropdown
            label="Categoria"
            value={filters.category}
            onChange={(value) =>
              updateFilter(
                "category",
                value === "Todas as categorias" ? "" : value
              )
            }
            options={categories}
            placeholder="Selecione uma categoria"
          />

          <Dropdown
            label="País"
            value={filters.country}
            onChange={(value) =>
              updateFilter("country", value === "Todos os países" ? "" : value)
            }
            options={countries}
            placeholder="Selecione um país"
          />

          <Dropdown
            label="Estado"
            value={filters.state}
            onChange={(value) =>
              updateFilter("state", value === "Todos os estados" ? "" : value)
            }
            options={states}
            placeholder="Selecione um estado"
          />

          <Dropdown
            label="Cidade"
            value={filters.city}
            onChange={(value) =>
              updateFilter("city", value === "Todas as cidades" ? "" : value)
            }
            options={cities}
            placeholder="Selecione uma cidade"
          />
        </div>

        <div className="sort-and-actions">
          <Dropdown
            label="Ordenar por"
            value={
              sortOptions.find((opt) => opt.value === filters.sortBy)?.label ||
              "Nome (A-Z)"
            }
            onChange={(value) => {
              const option = sortOptions.find((opt) => opt.label === value);
              if (option)
                updateFilter(
                  "sortBy",
                  option.value as "name" | "rating" | "newest"
                );
            }}
            options={sortOptions.map((opt) => opt.label)}
            placeholder="Ordenar por"
          />

          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Limpar Filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
