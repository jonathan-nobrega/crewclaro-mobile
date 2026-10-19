import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import type { Message } from "@crewclaro/api-types";
import { listMessages, sendMessage } from "../../src/lib/api";

export default function ChatScreen() {
  const projectId = "prj_123"; // TODO: project picker
  const lang = "es";
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => { listMessages(projectId, lang).then((p) => setMessages(p.data)); }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <Text style={{ fontWeight: "600" }}>{item.sender.name}</Text>
            <Text>{item.translations[lang] ?? item.original.text}</Text>
          </View>
        )}
      />
      <TextInput
        value={draft}
        onChangeText={setDraft}
        placeholder="Escribe un mensaje…"
        onSubmitEditing={async () => { await sendMessage(projectId, draft); setDraft(""); }}
        style={{ borderTopWidth: 1, padding: 12 }}
      />
    </View>
  );
}
