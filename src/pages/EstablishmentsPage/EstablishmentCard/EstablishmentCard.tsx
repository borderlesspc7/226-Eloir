"use client";

import type { EstablishmentWithRating } from "../../../types/establishment";
import { Button } from "../../../components/ui/Button/Button";
import "./EstablishmentCard.css";

interface EstablishmentCardProps {
  establishment: EstablishmentWithRating;
  onViewDetails: (id: string) => void;
}

export function EstablishmentCard({
  establishment,
  onViewDetails,
}: EstablishmentCardProps) {
  const { name, category, adress, productsServices, rating, reviewCount } =
    establishment;

  const displayProducts = productsServices.slice(0, 3);
  const hasMoreProducts = productsServices.length > 3;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star star-full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star star-half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star star-empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="establishment-card">
      <div className="establishment-card-header">
        <h3 className="establishment-name">{name}</h3>
        <span className="establishment-category">{category}</span>
      </div>

      <div className="establishment-address">
        <span className="address-icon">📍</span>
        <span>
          {adress.city}, {adress.state}
        </span>
      </div>

      <div className="establishment-products">
        <h4>Produtos/Serviços:</h4>
        <div className="products-list">
          {displayProducts.map((product, index) => (
            <span key={index} className="product-tag">
              {product}
            </span>
          ))}
          {hasMoreProducts && (
            <span className="product-tag more-products">
              +{productsServices.length - 3} mais
            </span>
          )}
        </div>
      </div>

      {rating && (
        <div className="establishment-rating">
          <div className="stars">{renderStars(rating)}</div>
          <span className="rating-text">
            {rating.toFixed(1)} ({reviewCount} avaliações)
          </span>
        </div>
      )}

      <div className="establishment-card-footer">
        <Button
          variant="primary"
          fullWidth
          onClick={() => onViewDetails(establishment.id!)}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
