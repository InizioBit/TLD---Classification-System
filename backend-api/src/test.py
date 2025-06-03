import os

root_dir = r"D:\Coding Projects\TLD - Classification System\frontend-react\public\images"

for folder_name in os.listdir(root_dir):
    folder_path = os.path.join(root_dir, folder_name)
    if os.path.isdir(folder_path):
        files = os.listdir(folder_path)
        counter = 1
        for file_name in files:
            file_path = os.path.join(folder_path, file_name)
            if os.path.isfile(file_path):
                ext = os.path.splitext(file_name)[1]
                new_name = f"{counter}{ext}"
                new_path = os.path.join(folder_path, new_name)
                
                # Cek apakah nama sudah ada, jika iya cari nama lain
                suffix = 1
                while os.path.exists(new_path):
                    new_name = f"{counter}_{suffix}{ext}"
                    new_path = os.path.join(folder_path, new_name)
                    suffix += 1
                
                os.rename(file_path, new_path)
                print(f"Renamed {file_name} -> {new_name} in folder {folder_name}")
                counter += 1
