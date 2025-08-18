"use client";
import React, { useState } from "react";
import "./RegisterPlace.css";
import { Logo } from "../../components/ui/Logo/Logo";
import { TextInput } from "../../components/ui/TextInput/TextInput";
import { Dropdown } from "../../components/RegisterPlace/Dropdown/Dropdown";
import { FileUploader } from "../../components/RegisterPlace/FileUploader/FileUploader";
import { MultiInputList } from "../../components/RegisterPlace/MultiInputList/MultiInputList";
import { PlanSelector } from "../../components/RegisterPlace/PlanSelection/PlanSelection";
import { Button } from "../../components/ui/Button/Button";
import { useEstablishment } from "../../hooks/useEstablishment";
import { useAuth } from "../../hooks/useAuth";

interface EstablishmentFormData {
  name: string;
  cnpjCpf: string;
  country: string;
  state: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
  category: string;
  productsServices: string[];
  plan: string;
  documents: File[];
}

interface FormErrors {
  [key: string]: string;
}

const categories = [
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

export default function RegisterPlace() {
  const [formData, setFormData] = useState<EstablishmentFormData>({
    name: "",
    cnpjCpf: "",
    country: "Brasil",
    state: "",
    city: "",
    street: "",
    number: "",
    zipCode: "",
    category: "",
    productsServices: [],
    plan: "",
    documents: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { createEstablishment } = useEstablishment();
  const { user } = useAuth();

  const validateCNPJCPF = (value: string): boolean => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cnpjRegex.test(value) || cpfRegex.test(value);
  };

  const registeredCNPJs = ["12.345.678/0001-90", "98.765.432/0001-10"];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Nome do estabelecimento é obrigatório";
    if (!formData.cnpjCpf.trim()) {
      newErrors.cnpjCpf = "CNPJ/CPF é obrigatório";
    } else if (!validateCNPJCPF(formData.cnpjCpf)) {
      newErrors.cnpjCpf =
        "Formato inválido. Use: 12.345.678/0001-90 ou 123.456.789-01";
    } else if (registeredCNPJs.includes(formData.cnpjCpf)) {
      newErrors.cnpjCpf = "Este CNPJ/CPF já está cadastrado";
    }

    if (!formData.state.trim()) newErrors.state = "Estado é obrigatório";
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
    if (!formData.street.trim()) newErrors.street = "Rua é obrigatória";
    if (!formData.number.trim()) newErrors.number = "Número é obrigatório";
    if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório";
    if (!formData.category) newErrors.category = "Categoria é obrigatória";
    if (formData.productsServices.length === 0) {
      newErrors.productsServices = "Adicione pelo menos um produto ou serviço";
    }
    if (!formData.plan) newErrors.plan = "Selecione um plano";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user?.uid) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const establishmentData = {
        name: formData.name,
        cnpjCpf: formData.cnpjCpf,
        adress: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipCode: formData.zipCode,
        },
        category: formData.category,
        productsServices: formData.productsServices,
        plan: formData.plan,
        documents: formData.documents,
      };

      await createEstablishment(establishmentData);
      setSubmitStatus("success");

      setFormData({
        name: "",
        cnpjCpf: "",
        country: "Brasil",
        state: "",
        city: "",
        street: "",
        number: "",
        zipCode: "",
        category: "",
        productsServices: [],
        plan: "",
        documents: [],
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (
    field: keyof EstablishmentFormData,
    value: string | string[] | File[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="establishment-register-page">
      <div className="establishment-register-container">
        <div className="establishment-register-form-section">
          <div className="establishment-register-header">
            <h1>Cadastrar Estabelecimento</h1>
            <p>Registre seu negócio na nossa plataforma</p>
          </div>

          <form onSubmit={handleSubmit} className="establishment-register-form">
            <div className="form-section">
              <h3>Informações Básicas</h3>
              <TextInput
                label="Nome do Estabelecimento"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                error={errors.name}
                placeholder="Ex: Restaurante do João"
              />

              <TextInput
                label="CNPJ/CPF"
                value={formData.cnpjCpf}
                onChange={(e) => updateFormData("cnpjCpf", e.target.value)}
                error={errors.cnpjCpf}
                placeholder="12.345.678/0001-90 ou 123.456.789-01"
              />
            </div>

            <div className="form-section">
              <h3>Endereço</h3>
              <div className="address-grid">
                <TextInput
                  label="País"
                  value={formData.country}
                  onChange={(e) => updateFormData("country", e.target.value)}
                  error={errors.country}
                />

                <TextInput
                  label="Estado"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  error={errors.state}
                  placeholder="Ex: São Paulo"
                />

                <TextInput
                  label="Cidade"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  error={errors.city}
                  placeholder="Ex: São Paulo"
                />

                <TextInput
                  label="Rua"
                  value={formData.street}
                  onChange={(e) => updateFormData("street", e.target.value)}
                  error={errors.street}
                  placeholder="Ex: Rua das Flores"
                />

                <TextInput
                  label="Número"
                  value={formData.number}
                  onChange={(e) => updateFormData("number", e.target.value)}
                  error={errors.number}
                  placeholder="123"
                />

                <TextInput
                  label="CEP"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  error={errors.zipCode}
                  placeholder="01234-567"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Categoria e Serviços</h3>
              <Dropdown
                label="Categoria do Estabelecimento"
                value={formData.category}
                onChange={(value) => updateFormData("category", value)}
                options={categories}
                error={errors.category}
                placeholder="Selecione uma categoria"
              />

              <MultiInputList
                label="Categorias e Serviços"
                items={formData.productsServices}
                onChange={(items) => updateFormData("productsServices", items)}
                error={errors.productsServices}
                placeholder="Ex: Pizza margherita, Hambúrguer artesanal"
              />
            </div>

            <div className="form-section">
              <h3>Plano de Assinatura</h3>
              <PlanSelector
                selectedPlan={formData.plan}
                onChange={(plan) => updateFormData("plan", plan)}
                error={errors.plan}
              />
            </div>

            <div className="form-section">
              <h3>Documentos (Opcional)</h3>
              <FileUploader
                files={formData.documents}
                onChange={(files) => updateFormData("documents", files)}
                maxFiles={5}
                acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              />
            </div>

            {submitStatus === "success" && (
              <div className="success-message">
                ✅ Estabelecimento cadastrado com sucesso! Aguarde a moderação.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="error-message">
                ❌ Erro ao cadastrar estabelecimento. Tente novamente.
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar Estabelecimento"}
            </Button>
          </form>
        </div>

        <div className="establishment-register-brand-section">
          <Logo />
          <div className="brand-image">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Ilustração de comércio local"
              className="brand-illustration"
            />
          </div>
          <div className="brand-text">
            <h2>Faça parte da nossa rede</h2>
            <p>
              Conecte seu negócio com milhares de clientes locais e aumente suas
              vendas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
