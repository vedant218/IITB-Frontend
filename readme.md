
# Chemical Supplies Manager

A simple, responsive web application for managing and viewing chemical supplies, built using only HTML, CSS, and plain JavaScript. This project was completed as part of a technical interview challenge for a Javascript Web Programmer position.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Design Approach](#design-approach)
- [Hosting](#hosting)
- [Additional Notes](#additional-notes)

## Overview

The Chemical Supplies Manager provides a table to manage details of chemical supplies, such as vendor, density, viscosity, packaging, and quantity. The application includes sorting, editing, and data management functions, and is designed to work smoothly on both desktop and mobile devices.

## Features

- **Dynamic Table:** Displays details for chemicals with sortable columns.
- **Data Management:** Users can add, move, delete, edit, and save rows.
- **Sorting:** Click on table headers to sort the data in ascending or descending order.
- **Progressive Web App (PWA):** Designed to work on mobile and desktop with offline capabilities.
- **Persistent Storage:** Uses local storage to save chemical data.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vedant218/IITB-Frontend.git
   cd IITB-Frontend


## Usage

- **Sort Data**: Click on any column header to toggle between ascending and descending order.
- **Edit Rows**: Click the "Edit" button in a row to update details directly.
- **Add Row**: Use the toolbar to add a new row to the table.
- **Move Rows**: Use "Move Up" or "Move Down" to adjust row order.
- **Delete Row**: Select a row and click "Delete" to remove it.
- **Reset Data**: Data is loaded back to the default state.

Note: Any changes made to the data are saved automatically in local storage.

## Design Approach

### Data Structure

A JSON array with 15 objects represents the chemicals data. Each object includes:

- `id`, `Chemical name`, `Vendor`, `Density`, `Viscosity`, `Packaging`, `Pack size`, `Unit`, and `Quantity`.

### Sorting

Sorting is implemented by listening for click events on table headers. The sorting algorithm dynamically orders rows in ascending or descending order based on column data type.

### Editing

The edit functionality is handled within each table row, allowing users to toggle into edit mode and save updates locally.

### Styling

The UI follows a minimalist design using custom CSS and Bootstrap components for consistency. The layout is responsive for both desktop and mobile views.

### Progressive Web App (PWA)

- **Manifest**: Defines app icons, name, and start URL.
- **Service Worker**: Registers a service worker to cache files for offline use.

## Hosting

This application is hosted on Vercel , accessible at: https://frontend-iit.vercel.app/.

## Additional Notes

Since the task stated to use creative ideas to build edit functionality, I developed an edit button instead of inline edits and followed a modular approach for neatness and practicality. In line edits were also developed (Image below).
![image](https://github.com/user-attachments/assets/766ae98f-2d0e-45ee-b3f8-1110abfd3814)


