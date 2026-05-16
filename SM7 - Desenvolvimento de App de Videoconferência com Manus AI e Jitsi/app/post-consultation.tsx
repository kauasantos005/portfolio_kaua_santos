import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function PostConsultationScreen() {
  const router = useRouter();
  const colors = useColors();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = async (value: number) => {
    setRating(value);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setIsSubmitting(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate API call
    setTimeout(async () => {
      setIsSubmitting(false);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)");
    }, 1000);
  };

  const handleSkip = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(tabs)");
  };

  const getRatingMessage = (value: number) => {
    switch (value) {
      case 1:
        return "Ruim";
      case 2:
        return "Precisa melhorar";
      case 3:
        return "Bom";
      case 4:
        return "Muito bom";
      case 5:
        return "Excelente";
      default:
        return "";
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 py-8 justify-center gap-8">
          {/* Header */}
          <View className="gap-4 items-center">
            <Text className="text-5xl">⭐</Text>
            <Text className="text-3xl font-bold text-foreground text-center">
              Como foi sua consulta?
            </Text>
            <Text className="text-base text-muted text-center">
              Sua avaliação nos ajuda a melhorar o serviço
            </Text>
          </View>

          {/* Rating Stars */}
          <View className="gap-4">
            <View className="flex-row justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => handleRating(star)}
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 1.2 : 1 }],
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                  className="p-2"
                >
                  <Text
                    className={`text-5xl ${
                      star <= rating ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ⭐
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Rating Message */}
            {rating > 0 && (
              <View className="items-center">
                <Text className="text-lg font-semibold text-primary">
                  {getRatingMessage(rating)}
                </Text>
              </View>
            )}
          </View>

          {/* Comment Field */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-foreground">
              Comentários (Opcional)
            </Text>
            <TextInput
              placeholder="Compartilhe sua experiência..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground"
              placeholderTextColor={colors.muted}
              editable={!isSubmitting}
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmitRating}
            disabled={isSubmitting || rating === 0}
            style={({ pressed }) => [
              {
                backgroundColor: rating === 0 ? colors.muted : colors.primary,
                opacity: pressed ? 0.8 : isSubmitting ? 0.6 : 1,
              },
            ]}
            className="w-full py-4 px-6 rounded-lg items-center"
          >
            <Text className="text-lg font-bold text-background">
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </Text>
          </Pressable>

          {/* Skip Button */}
          <Pressable
            onPress={handleSkip}
            disabled={isSubmitting}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="w-full py-3 px-6 rounded-lg items-center border border-border"
          >
            <Text className="text-base font-semibold text-foreground">
              Pular
            </Text>
          </Pressable>

          {/* Success Message */}
          {rating > 0 && (
            <View className="bg-success bg-opacity-10 border border-success rounded-lg p-4 items-center gap-2">
              <Text className="text-lg">✓</Text>
              <Text className="text-sm text-foreground text-center">
                Sua avaliação é importante para nós!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
