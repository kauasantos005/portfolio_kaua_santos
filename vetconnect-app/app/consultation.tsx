import { ScrollView, Text, View, Pressable, TextInput, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface ChatMessage {
  id: string;
  sender: "user" | "veterinarian";
  text: string;
  timestamp: string;
}

export default function ConsultationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colors = useColors();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "veterinarian",
      text: "Olá! Tudo bem? Vou analisar o seu pet agora.",
      timestamp: "14:00",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showChat, setShowChat] = useState(true);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleEndCall = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to post-consultation rating
    router.push("/post-consultation");
  };

  const toggleCamera = async () => {
    setIsCameraOn(!isCameraOn);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleMic = async () => {
    setIsMicOn(!isMicOn);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      className={`flex-row mb-3 ${
        item.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <View
        className={`max-w-xs px-4 py-2 rounded-lg ${
          item.sender === "user"
            ? "bg-primary rounded-br-none"
            : "bg-surface border border-border rounded-bl-none"
        }`}
      >
        <Text
          className={`text-base ${
            item.sender === "user" ? "text-background" : "text-foreground"
          }`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.sender === "user"
              ? "text-background opacity-70"
              : "text-muted"
          }`}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="bg-background" edges={["top", "left", "right"]}>
      <View className="flex-1 flex-row">
        {/* Video Area */}
        <View className="flex-1 bg-black rounded-lg overflow-hidden items-center justify-center">
          <View className="w-full h-full bg-gray-900 items-center justify-center gap-4">
            <Text className="text-6xl">📹</Text>
            <Text className="text-white text-center px-4">
              Videochamada com Dr. Silva
            </Text>
            <Text className="text-gray-400 text-sm">
              Integração Jitsi Meet
            </Text>
          </View>

          {/* Video Controls */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-4 px-4">
            <Pressable
              onPress={toggleMic}
              style={({ pressed }) => [
                {
                  backgroundColor: isMicOn
                    ? colors.primary
                    : colors.error,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="w-12 h-12 rounded-full items-center justify-center"
            >
              <Text className="text-xl">
                {isMicOn ? "🎤" : "🔇"}
              </Text>
            </Pressable>

            <Pressable
              onPress={toggleCamera}
              style={({ pressed }) => [
                {
                  backgroundColor: isCameraOn
                    ? colors.primary
                    : colors.error,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              className="w-12 h-12 rounded-full items-center justify-center"
            >
              <Text className="text-xl">
                {isCameraOn ? "📷" : "🚫"}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleEndCall}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              className="w-12 h-12 rounded-full items-center justify-center bg-error"
            >
              <Text className="text-xl">☎️</Text>
            </Pressable>
          </View>
        </View>

        {/* Chat Area */}
        {showChat && (
          <View className="w-64 bg-surface border-l border-border flex-col">
            {/* Chat Header */}
            <View className="px-4 py-3 border-b border-border flex-row justify-between items-center">
              <Text className="text-base font-bold text-foreground">Chat</Text>
              <Pressable
                onPress={() => setShowChat(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Text className="text-lg">✕</Text>
              </Pressable>
            </View>

            {/* Messages */}
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 12, flexGrow: 1 }}
              inverted
            />

            {/* Message Input */}
            <View className="flex-row gap-2 px-3 py-3 border-t border-border">
              <TextInput
                placeholder="Mensagem..."
                value={newMessage}
                onChangeText={setNewMessage}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                placeholderTextColor={colors.muted}
              />
              <Pressable
                onPress={handleSendMessage}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className="w-10 h-10 bg-primary rounded-lg items-center justify-center"
              >
                <Text className="text-lg">➤</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Toggle Chat Button */}
        {!showChat && (
          <Pressable
            onPress={() => setShowChat(true)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="absolute right-4 bottom-20 w-12 h-12 bg-primary rounded-full items-center justify-center"
          >
            <Text className="text-xl">💬</Text>
          </Pressable>
        )}
      </View>
    </ScreenContainer>
  );
}
