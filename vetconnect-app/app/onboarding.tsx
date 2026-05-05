import { ScrollView, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import * as Haptics from 'expo-haptics';

export default function OnboardingScreen() {
  const router = useRouter();
  const { setProfile } = useAuth();
  const colors = useColors();

  const handleSelectProfile = async (profile: 'tutor' | 'veterinarian') => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await setProfile(profile);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error selecting profile:', error);
    }
  };

  return (
    <ScreenContainer className="bg-background" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center items-center px-6 gap-8">
          {/* Logo */}
          <View className="items-center gap-4">
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
              <Text className="text-5xl">🐾</Text>
            </View>
            <Text className="text-4xl font-bold text-foreground text-center">VetConnect</Text>
            <Text className="text-lg text-muted text-center">
              Telemedicina Veterinária ao Seu Alcance
            </Text>
          </View>

          {/* Description */}
          <View className="gap-3">
            <View className="flex-row gap-3 items-start">
              <Text className="text-2xl">✓</Text>
              <Text className="flex-1 text-base text-foreground">
                Consulte veterinários de forma segura e rápida
              </Text>
            </View>
            <View className="flex-row gap-3 items-start">
              <Text className="text-2xl">✓</Text>
              <Text className="flex-1 text-base text-foreground">
                Videochamada em tempo real com chat integrado
              </Text>
            </View>
            <View className="flex-row gap-3 items-start">
              <Text className="text-2xl">✓</Text>
              <Text className="flex-1 text-base text-foreground">
                Histórico completo de consultas do seu pet
              </Text>
            </View>
          </View>

          {/* Profile Selection */}
          <View className="w-full gap-4 mt-4">
            <Text className="text-xl font-bold text-foreground text-center">
              Qual é o seu perfil?
            </Text>

            {/* Tutor Button */}
            <Pressable
              onPress={() => handleSelectProfile('tutor')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="w-full py-4 px-6 rounded-lg items-center gap-3 flex-row justify-center"
            >
              <Text className="text-3xl">👨‍⚕️</Text>
              <View>
                <Text className="text-lg font-bold text-background">Sou Tutor</Text>
                <Text className="text-sm text-background opacity-80">
                  Buscar consultas para meu pet
                </Text>
              </View>
            </Pressable>

            {/* Veterinarian Button */}
            <Pressable
              onPress={() => handleSelectProfile('veterinarian')}
              style={({ pressed }) => [
                {
                  borderColor: colors.primary,
                  borderWidth: 2,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="w-full py-4 px-6 rounded-lg items-center gap-3 flex-row justify-center bg-background"
            >
              <Text className="text-3xl">🩺</Text>
              <View>
                <Text className="text-lg font-bold text-foreground">Sou Veterinário</Text>
                <Text className="text-sm text-muted">
                  Atender consultas de tutores
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="mt-8 gap-2">
            <Text className="text-xs text-muted text-center">
              Ao continuar, você concorda com nossos
            </Text>
            <View className="flex-row justify-center gap-1">
              <Pressable>
                <Text className="text-xs text-primary font-semibold">Termos de Serviço</Text>
              </Pressable>
              <Text className="text-xs text-muted">e</Text>
              <Pressable>
                <Text className="text-xs text-primary font-semibold">Política de Privacidade</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
