import { fetchTags } from "@/config/tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UseUploadQrLogoProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUploadQrLogo = () => {
  const query = useQueryClient();

  const { mutate, data, isPending } = useMutation({
    mutationKey: [fetchTags.logos],
    mutationFn: async (file: File) => {
      // Validate file before uploading
      if (!file) {
        throw new Error("No file selected");
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
      }

      if (file.size > 1000000) {
        throw new Error(
          `File size is too large (${(file.size / 1000000).toFixed(
            2
          )} MB), max file size is 1MB`
        );
      }

      toast.loading("Uploading...", {
        id: "upload-logo",
      });

      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      const base64Data = await base64Promise;

      const res = await fetch("/api/logo/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64Data,
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Error uploading logo");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Logo uploaded successfully", {
        id: "upload-logo",
      });
      query.invalidateQueries({ queryKey: [fetchTags.logos] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error uploading logo",
        {
          id: "upload-logo",
        }
      );
    },
  });

  return {
    uploadLogo: mutate,
    logos: data || [],
    isPendingUploadingLogos: isPending,
  };
};
