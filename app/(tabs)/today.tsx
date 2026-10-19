import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import type { Task } from "@crewclaro/api-types";
import { myTasksToday } from "../../src/lib/api";

export default function TodayScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => { myTasksToday().then((p) => setTasks(p.data)); }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 16 }}>{item.title.es ?? item.title.en}</Text>
          <Text style={{ color: "#64748b" }}>{item.trade} · {item.status}</Text>
        </View>
      )}
    />
  );
}
