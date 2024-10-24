type MCAPFileInformation = {
  id: string;
  mcap_file_name: string;
  matlab_file_name: string;
  aws_bucket: string;
  mcap_path: string;
  mat_path: string;
  vn_lat_lon_path: string;
  velocity_plot_path: string;
  date: string;
  location: string;
  notes: string?;
  event_type: string?;
  signed_url: string?;
};
