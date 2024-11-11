type FileType = {
  file_name: string;
  signed_url: string;
};

type ContentFileType = {
  content: string;
  signed_url: string;
};

type MCAPFileInformation = {
  id: string;
  schema_versions?: null;
  mcap_files: FileType[];
  mat_files: FileType[];
  content_files: ContentFileType[];
  date: string;
  location: string;
  notes?: string;
  event_type?: string;
  schema?: { [key: string]: string };
};

type SearchFilter = {
  location?: string;
  searchText?: string;
  date?: string;
  eventType?: string;
  afterDate?: string;
  beforeDate?: string;
};
