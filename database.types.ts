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
      Student_Marks: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          mark1: number | null
          mark2: number | null
          mark3: number | null
          mark4: number | null
          sessionID: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          mark1?: number | null
          mark2?: number | null
          mark3?: number | null
          mark4?: number | null
          sessionID?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          mark1?: number | null
          mark2?: number | null
          mark3?: number | null
          mark4?: number | null
          sessionID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Student_Marks_sessionID_fkey"
            columns: ["sessionID"]
            referencedRelation: "Student_Sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      Student_Sessions: {
        Row: {
          academic_year: string | null
          acct: string | null
          add_math: string | null
          arts: string | null
          bio: string | null
          bs: string | null
          ca: string | null
          chem: string | null
          chinese: string | null
          class_code: string | null
          class_term: number | null
          cs: string | null
          econ: string | null
          english: string | null
          geo: string | null
          history: string | null
          ict: string | null
          id: string
          literacy: string | null
          ma: string | null
          malay: string | null
          math: string | null
          phy: string | null
          reading: string | null
          scs: string | null
          studentID: string | null
          va: string | null
        }
        Insert: {
          academic_year?: string | null
          acct?: string | null
          add_math?: string | null
          arts?: string | null
          bio?: string | null
          bs?: string | null
          ca?: string | null
          chem?: string | null
          chinese?: string | null
          class_code?: string | null
          class_term?: number | null
          cs?: string | null
          econ?: string | null
          english?: string | null
          geo?: string | null
          history?: string | null
          ict?: string | null
          id?: string
          literacy?: string | null
          ma?: string | null
          malay?: string | null
          math?: string | null
          phy?: string | null
          reading?: string | null
          scs?: string | null
          studentID?: string | null
          va?: string | null
        }
        Update: {
          academic_year?: string | null
          acct?: string | null
          add_math?: string | null
          arts?: string | null
          bio?: string | null
          bs?: string | null
          ca?: string | null
          chem?: string | null
          chinese?: string | null
          class_code?: string | null
          class_term?: number | null
          cs?: string | null
          econ?: string | null
          english?: string | null
          geo?: string | null
          history?: string | null
          ict?: string | null
          id?: string
          literacy?: string | null
          ma?: string | null
          malay?: string | null
          math?: string | null
          phy?: string | null
          reading?: string | null
          scs?: string | null
          studentID?: string | null
          va?: string | null
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
      Teacher_Classes: {
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
      Teachers: {
        Row: {
          email: string | null
          id: string
          isregistered: boolean | null
          name: string | null
          subject: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          isregistered?: boolean | null
          name?: string | null
          subject?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          isregistered?: boolean | null
          name?: string | null
          subject?: string | null
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
