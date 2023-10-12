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
          class_code: string
        }
        Insert: {
          class_code: string
        }
        Update: {
          class_code?: string
        }
        Relationships: []
      }
      Student_Divisions: {
        Row: {
          academic_year: string | null
          class_term: number | null
          division: string | null
          id: string
          studentID: string
          subject: string | null
        }
        Insert: {
          academic_year?: string | null
          class_term?: number | null
          division?: string | null
          id?: string
          studentID: string
          subject?: string | null
        }
        Update: {
          academic_year?: string | null
          class_term?: number | null
          division?: string | null
          id?: string
          studentID?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Student_Divisions_studentID_fkey"
            columns: ["studentID"]
            referencedRelation: "Students"
            referencedColumns: ["studentID"]
          }
        ]
      }
      Student_Sessions: {
        Row: {
          academic_year: string | null
          class_code: string | null
          class_term: number | null
          divisions: Json[] | null
          id: string
          studentID: string | null
        }
        Insert: {
          academic_year?: string | null
          class_code?: string | null
          class_term?: number | null
          divisions?: Json[] | null
          id?: string
          studentID?: string | null
        }
        Update: {
          academic_year?: string | null
          class_code?: string | null
          class_term?: number | null
          divisions?: Json[] | null
          id?: string
          studentID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Student_Sessions_studentID_fkey"
            columns: ["studentID"]
            referencedRelation: "Students"
            referencedColumns: ["studentID"]
          }
        ]
      }
      Students: {
        Row: {
          id: string | null
          name: string | null
          studentID: string
        }
        Insert: {
          id?: string | null
          name?: string | null
          studentID: string
        }
        Update: {
          id?: string | null
          name?: string | null
          studentID?: string
        }
        Relationships: []
      }
      Subjects: {
        Row: {
          Abbreviation: string
          Name: string | null
        }
        Insert: {
          Abbreviation: string
          Name?: string | null
        }
        Update: {
          Abbreviation?: string
          Name?: string | null
        }
        Relationships: []
      }
      "Teacher Classes": {
        Row: {
          academic_year: string | null
          available_classrooms: string | null
          class_codes: string | null
          class_term: number | null
          group: string | null
          id: string
          subject: string | null
          teacher: string | null
        }
        Insert: {
          academic_year?: string | null
          available_classrooms?: string | null
          class_codes?: string | null
          class_term?: number | null
          group?: string | null
          id?: string
          subject?: string | null
          teacher?: string | null
        }
        Update: {
          academic_year?: string | null
          available_classrooms?: string | null
          class_codes?: string | null
          class_term?: number | null
          group?: string | null
          id?: string
          subject?: string | null
          teacher?: string | null
        }
        Relationships: []
      }
      "Teacher Classes individual": {
        Row: {
          academic_year: string | null
          Class: string | null
          class_term: number | null
          id: string
          Teacher: string | null
        }
        Insert: {
          academic_year?: string | null
          Class?: string | null
          class_term?: number | null
          id?: string
          Teacher?: string | null
        }
        Update: {
          academic_year?: string | null
          Class?: string | null
          class_term?: number | null
          id?: string
          Teacher?: string | null
        }
        Relationships: []
      }
      Teachers: {
        Row: {
          email: string | null
          id: string
          isregistered: boolean | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          isregistered?: boolean | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          isregistered?: boolean | null
          name?: string | null
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
