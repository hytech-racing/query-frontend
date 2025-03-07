/**
 * Represents information about an MCAP (Model, Configuration, and Analysis Protocol) file and its associated data.
 * Each entry in the array corresponds to a specific event, containing metadata about files, content, and event details.
 *
 * @typedef {Object} MCAPFileInformationNew
 * @property {string} id - A unique identifier for the event.
 * @property {Array<>} mcap_files - An array of MCAP files related to the event. Each file is represented by its name and a signed URL to access the file.
 * @property {Array<>} mat_files - An array of MAT files associated with the event. Similar to `mcap_files`, each MAT file has a file name and signed URL.
 * @property {Array<>} content_files - An array of content files, each having a name (`content`) and a signed URL for access.
 * @property {string} date - The date when the event occurred, formatted as MM-DD-YYYY.
 * @property {string} location - The location where the event took place.
 * @property {string} notes - Additional notes or comments about the event.
 * @property {string} event_type - The type of event (e.g., "acceleration", "endurance").
 * @property {Object} schema - An object containing versioning information for the event's schema. Each schema property represents a version string.
 */
export const data: MCAPFileInformationNew[] = [
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-22-2024",
    location: "SCC",
    notes: "car ran!",
    event_type: "acceleration",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-29-2024",
    location: "Michigan",
    notes: "car ran!",
    event_type: "endurance",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-22-2020",
    location: "Rome",
    notes: "car ran!",
    event_type: "skidpad",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "10-22-2024",
    location: "MRDC",
    notes: "car ran!",
    event_type: "autocross",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "05-22-2024",
    location: "SCC",
    notes: "car ran!",
    event_type: "acceleration",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-22-2023",
    location: "Rome",
    notes: "car ran!",
    event_type: "endurance",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-24-2024",
    location: "Michigan",
    notes: "car ran!",
    event_type: "skidpad",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
  {
    id: "505deb4b-44a8-48dd-9da6-a671c1d3eccd",
    mcap_files: [
      {
        file_name: "filename",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    mat_files: [
      {
        file_name: "filename1",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        file_name: "filename2",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    content_files: [
      {
        content: "vn_lat_lon_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
      {
        content: "avg_vel_graph",
        signed_url:
          "https://camo.githubusercontent.com/25de56138803873d9ea83567c55b9a022ad86d0acb53bb7c733bb038583e2279/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3430302f312a7241676c6b664c4c316676384a6363697a4a33572d512e706e67",
      },
    ],
    date: "08-28-2024",
    location: "MRDC",
    notes: "car ran!",
    event_type: "autocross",
    schema: {
      schema_1: "1.2.3",
      schema_2: "1.2.3",
      schema_3: "1.2.3",
      schema_4: "1.2.3",
    },
  },
];
