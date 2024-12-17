type MCAPFileInformation = {
  id: string;
  car_model: string;
  schema_versions?: null;
  mcap_files: {
    signed_url: string;
    file_name: string;
  }[];
  mat_files: {
    signed_url: string;
    file_name: string;
  }[];
  content_files: {
    vn_lat_lon_plot: {
      signed_url: string;
      file_name: string;
    }[];
  };
  mcap_file_name: string;
  matlab_file_name: string;
  aws_bucket: string;
  mcap_path: string;
  mat_path: string;
  vn_lat_lon_path: string;
  velocity_plot_path: string;
  date: string;
  location: string;
  notes?: string;
  event_type?: string;
  signed_url?: string;
};

type SearchFilter = {
  location?: string;
  searchText?: string;
  date?: string;
  eventType?: string;
  afterDate?: string;
  beforeDate?: string;
};

type FileType = {
  file_name: string;
  signed_url: string;
};

type ContentFileType = {
  content: string;
  signed_url: string;
};

type MCAPFileInformationNew = {
  id: string;
  mcap_files: FileType[];
  mat_files: FileType[];
  content_files: ContentFileType[];
  date: string;
  location: string;
  notes?: string;
  event_type?: string;
  schema?: { [key: string]: string };
};
