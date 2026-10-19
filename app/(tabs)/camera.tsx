import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Button, View } from "react-native";
import { enqueueOutbound } from "../../src/offline/queue";

export default function CameraScreen() {
  const [permission, request] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  if (!permission?.granted) return <Button title="Allow camera" onPress={request} />;

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={ref} style={{ flex: 1 }} />
      <Button
        title="Attach to task"
        onPress={async () => {
          const photo = await ref.current?.takePictureAsync();
          if (photo) await enqueueOutbound({ kind: "photo", taskId: "tsk_77", localUri: photo.uri });
        }}
      />
    </View>
  );
}
