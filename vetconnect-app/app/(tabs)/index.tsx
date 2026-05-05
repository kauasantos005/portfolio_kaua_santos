import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/auth-context";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface Consultation {
  id: string;
  petName: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const colors = useColors();

  // Mock data - será substituído por dados reais
  const upcomingConsultations: Consultation[] = [
    {
      id: "1",
      petName: "Max",
      date: "Hoje às 14:00",
      status: "upcoming",
    },
    {
      id: "2",
      petName: "Luna",
      date: "Amanhã às 10:00",
      status: "upcoming",
    },
  ];

  const completedConsultations: Consultation[] = [
    {
      id: "3",
      petName: "Bella",
      date: "2 dias atrás",
      status: "completed",
    },
  ];

  const handleNewConsultation = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/pre-consultation");
  };

  const handleConsultationTap = async (consultationId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/consultation");
  };

  const renderConsultationCard = ({ item }: { item: Consultation }) => (
    <Pressable
      onPress={() => handleConsultationTap(item.id)}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="bg-surface rounded-lg p-4 mb-3 border border-border"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-foreground">{item.petName}</Text>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "upcoming"
              ? "bg-primary"
              : item.status === "completed"
                ? "bg-success"
                : "bg-error"
          }`}
        >
          <Text className="text-xs font-semibold text-background">
            {item.status === "upcoming"
              ? "Próxima"
              : item.status === "completed"
                ? "Concluída"
                : "Cancelada"}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-muted">{item.date}</Text>
    </Pressable>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {profile === "tutor" ? "Bem-vindo, Tutor!" : "Bem-vindo, Veterinário!"}
            </Text>
            <Text className="text-base text-muted">
              {profile === "tutor"
                ? "Gerencie as consultas do seu pet"
                : "Atenda seus pacientes"}
            </Text>
          </View>

          {/* New Consultation Button */}
          {profile === "tutor" && (
            <Pressable
              onPress={handleNewConsultation}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="w-full py-4 px-6 rounded-lg items-center flex-row justify-center gap-3"
            >
              <Text className="text-2xl">➕</Text>
              <Text className="text-lg font-bold text-background">Nova Consulta</Text>
            </Pressable>
          )}

          {/* Upcoming Consultations */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">Próximas Consultas</Text>
            {upcomingConsultations.length > 0 ? (
              <FlatList
                data={upcomingConsultations}
                renderItem={renderConsultationCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="bg-surface rounded-lg p-6 items-center gap-2">
                <Text className="text-4xl">📅</Text>
                <Text className="text-base text-muted text-center">
                  Nenhuma consulta agendada
                </Text>
              </View>
            )}
          </View>

          {/* Completed Consultations */}
          {completedConsultations.length > 0 && (
            <View className="gap-3">
              <Text className="text-xl font-bold text-foreground">Consultas Recentes</Text>
              <FlatList
                data={completedConsultations}
                renderItem={renderConsultationCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-lg p-4 items-center gap-2">
              <Text className="text-2xl">🏥</Text>
              <Text className="text-2xl font-bold text-foreground">
                {upcomingConsultations.length}
              </Text>
              <Text className="text-xs text-muted text-center">Próximas</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 items-center gap-2">
              <Text className="text-2xl">✅</Text>
              <Text className="text-2xl font-bold text-foreground">
                {completedConsultations.length}
              </Text>
              <Text className="text-xs text-muted text-center">Concluídas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
