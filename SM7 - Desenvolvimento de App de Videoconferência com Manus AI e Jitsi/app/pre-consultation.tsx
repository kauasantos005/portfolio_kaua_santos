import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

const SPECIES = ["Cão", "Gato", "Pássaro", "Coelho", "Outro"];

export default function PreConsultationScreen() {
  const router = useRouter();
  const colors = useColors();

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!petName.trim()) newErrors.petName = "Nome do pet é obrigatório";
    if (!species) newErrors.species = "Espécie é obrigatória";
    if (!symptoms.trim()) newErrors.symptoms = "Sintomas são obrigatórios";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartConsultation = async () => {
    if (!validateForm()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Save consultation data and navigate to consultation room
    router.push("/consultation");
  };

  const handleGoBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={handleGoBack}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              className="p-2"
            >
              <Text className="text-2xl">←</Text>
            </Pressable>
            <Text className="text-2xl font-bold text-foreground">Pré-Consulta</Text>
            <View className="w-8" />
          </View>

          {/* Form Title */}
          <View className="gap-2">
            <Text className="text-xl font-bold text-foreground">Dados do Pet</Text>
            <Text className="text-sm text-muted">
              Preencha as informações para iniciar a consulta
            </Text>
          </View>

          {/* Pet Name Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">Nome do Pet *</Text>
            <TextInput
              placeholder="Ex: Max, Luna, Bella"
              value={petName}
              onChangeText={setPetName}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground"
              placeholderTextColor={colors.muted}
            />
            {errors.petName && (
              <Text className="text-sm text-error">{errors.petName}</Text>
            )}
          </View>

          {/* Species Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">Espécie *</Text>
            <Pressable
              onPress={() => setShowSpeciesDropdown(!showSpeciesDropdown)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="bg-surface border border-border rounded-lg px-4 py-3 flex-row justify-between items-center"
            >
              <Text
                className={`text-base ${
                  species ? "text-foreground font-semibold" : "text-muted"
                }`}
              >
                {species || "Selecione a espécie"}
              </Text>
              <Text className="text-lg">▼</Text>
            </Pressable>

            {showSpeciesDropdown && (
              <View className="bg-surface border border-border rounded-lg overflow-hidden">
                {SPECIES.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => {
                      setSpecies(s);
                      setShowSpeciesDropdown(false);
                    }}
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                    className="px-4 py-3 border-b border-border"
                  >
                    <Text className="text-base text-foreground">{s}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {errors.species && (
              <Text className="text-sm text-error">{errors.species}</Text>
            )}
          </View>

          {/* Breed Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">Raça (Opcional)</Text>
            <TextInput
              placeholder="Ex: Labrador, Persa, Canário"
              value={breed}
              onChangeText={setBreed}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground"
              placeholderTextColor={colors.muted}
            />
          </View>

          {/* Age Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">Idade (Opcional)</Text>
            <TextInput
              placeholder="Ex: 2 anos, 6 meses"
              value={age}
              onChangeText={setAge}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground"
              placeholderTextColor={colors.muted}
            />
          </View>

          {/* Symptoms Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">Sintomas *</Text>
            <TextInput
              placeholder="Descreva os sintomas do seu pet..."
              value={symptoms}
              onChangeText={setSymptoms}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground"
              placeholderTextColor={colors.muted}
            />
            {errors.symptoms && (
              <Text className="text-sm text-error">{errors.symptoms}</Text>
            )}
          </View>

          {/* Start Consultation Button */}
          <Pressable
            onPress={handleStartConsultation}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            className="w-full py-4 px-6 rounded-lg items-center mt-4"
          >
            <Text className="text-lg font-bold text-background">Iniciar Consulta</Text>
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={handleGoBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="w-full py-3 px-6 rounded-lg items-center border border-border"
          >
            <Text className="text-base font-semibold text-foreground">Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
