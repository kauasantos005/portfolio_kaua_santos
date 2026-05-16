import { describe, it, expect } from 'vitest';

describe('Pre-Consultation Form Validation', () => {
  const validateForm = (data: {
    petName: string;
    species: string;
    symptoms: string;
  }) => {
    const errors: Record<string, string> = {};

    if (!data.petName.trim()) {
      errors.petName = 'Nome do pet é obrigatório';
    }
    if (!data.species) {
      errors.species = 'Espécie é obrigatória';
    }
    if (!data.symptoms.trim()) {
      errors.symptoms = 'Sintomas são obrigatórios';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  };

  it('should reject form with empty pet name', () => {
    const result = validateForm({
      petName: '',
      species: 'Cão',
      symptoms: 'Tosse',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.petName).toBeDefined();
  });

  it('should reject form with empty species', () => {
    const result = validateForm({
      petName: 'Max',
      species: '',
      symptoms: 'Tosse',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.species).toBeDefined();
  });

  it('should reject form with empty symptoms', () => {
    const result = validateForm({
      petName: 'Max',
      species: 'Cão',
      symptoms: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.symptoms).toBeDefined();
  });

  it('should accept valid form', () => {
    const result = validateForm({
      petName: 'Max',
      species: 'Cão',
      symptoms: 'Tosse e espirros',
    });

    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('should trim whitespace from pet name', () => {
    const result = validateForm({
      petName: '   Max   ',
      species: 'Cão',
      symptoms: 'Tosse',
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept all species options', () => {
    const species = ['Cão', 'Gato', 'Pássaro', 'Coelho', 'Outro'];

    species.forEach((s) => {
      const result = validateForm({
        petName: 'Pet',
        species: s,
        symptoms: 'Sintomas',
      });

      expect(result.isValid).toBe(true);
    });
  });
});
