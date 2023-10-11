export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Classes: {
        Row: {
          AcademicYearId: number | null
          Active: number | null
          ClassYearCode: string | null
          Code: string | null
          Id: number
          Name: string | null
          Term: number | null
        }
        Insert: {
          AcademicYearId?: number | null
          Active?: number | null
          ClassYearCode?: string | null
          Code?: string | null
          Id: number
          Name?: string | null
          Term?: number | null
        }
        Update: {
          AcademicYearId?: number | null
          Active?: number | null
          ClassYearCode?: string | null
          Code?: string | null
          Id?: number
          Name?: string | null
          Term?: number | null
        }
        Relationships: []
      }
      "Student Sessions": {
        Row: {
          "ACADEMIC YEAR": string | null
          "CLASS CODE": string | null
          "CLASS TERM": number | null
          id: string
          "STUDENT CARD ID": string | null
        }
        Insert: {
          "ACADEMIC YEAR"?: string | null
          "CLASS CODE"?: string | null
          "CLASS TERM"?: number | null
          id?: string
          "STUDENT CARD ID"?: string | null
        }
        Update: {
          "ACADEMIC YEAR"?: string | null
          "CLASS CODE"?: string | null
          "CLASS TERM"?: number | null
          id?: string
          "STUDENT CARD ID"?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Student Sessions_STUDENT CARD ID_fkey"
            columns: ["STUDENT CARD ID"]
            referencedRelation: "Students"
            referencedColumns: ["STUDENT CARD ID"]
          }
        ]
      }
      Students: {
        Row: {
          id: string | null
          "STUDENT CARD ID": string
          "STUDENT NAME": string | null
        }
        Insert: {
          id?: string | null
          "STUDENT CARD ID": string
          "STUDENT NAME"?: string | null
        }
        Update: {
          id?: string | null
          "STUDENT CARD ID"?: string
          "STUDENT NAME"?: string | null
        }
        Relationships: []
      }
      Teachers: {
        Row: {
          FullName: string | null
          id: string
          UserName: string | null
        }
        Insert: {
          FullName?: string | null
          id?: string
          UserName?: string | null
        }
        Update: {
          FullName?: string | null
          id?: string
          UserName?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
