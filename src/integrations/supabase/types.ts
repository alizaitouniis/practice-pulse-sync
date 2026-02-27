export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      denials: {
        Row: {
          amount: number
          code: string
          count: number
          created_at: string
          id: string
          provider_id: string
          reason: string
          report_date: string
          trend: string
        }
        Insert: {
          amount?: number
          code: string
          count?: number
          created_at?: string
          id?: string
          provider_id: string
          reason: string
          report_date?: string
          trend?: string
        }
        Update: {
          amount?: number
          code?: string
          count?: number
          created_at?: string
          id?: string
          provider_id?: string
          reason?: string
          report_date?: string
          trend?: string
        }
        Relationships: [
          {
            foreignKeyName: "denials_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_aging: {
        Row: {
          bucket_0_30: number
          bucket_120_plus: number
          bucket_31_60: number
          bucket_61_90: number
          bucket_91_120: number
          created_at: string
          id: string
          insurance: string
          provider_id: string
          report_date: string
          total: number
        }
        Insert: {
          bucket_0_30?: number
          bucket_120_plus?: number
          bucket_31_60?: number
          bucket_61_90?: number
          bucket_91_120?: number
          created_at?: string
          id?: string
          insurance: string
          provider_id: string
          report_date?: string
          total?: number
        }
        Update: {
          bucket_0_30?: number
          bucket_120_plus?: number
          bucket_31_60?: number
          bucket_61_90?: number
          bucket_91_120?: number
          created_at?: string
          id?: string
          insurance?: string
          provider_id?: string
          report_date?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "insurance_aging_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_summaries: {
        Row: {
          adjustments: number
          collection_rate: number
          created_at: string
          id: string
          monthly_revenue: number
          outstanding_ar: number
          payments_collected: number
          provider_id: string
          report_date: string
          total_charges: number
        }
        Insert: {
          adjustments?: number
          collection_rate?: number
          created_at?: string
          id?: string
          monthly_revenue?: number
          outstanding_ar?: number
          payments_collected?: number
          provider_id: string
          report_date?: string
          total_charges?: number
        }
        Update: {
          adjustments?: number
          collection_rate?: number
          created_at?: string
          id?: string
          monthly_revenue?: number
          outstanding_ar?: number
          payments_collected?: number
          provider_id?: string
          report_date?: string
          total_charges?: number
        }
        Relationships: [
          {
            foreignKeyName: "kpi_summaries_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_aging: {
        Row: {
          balance: number
          bucket: string
          created_at: string
          id: string
          pct: number
          provider_id: string
          report_date: string
        }
        Insert: {
          balance?: number
          bucket: string
          created_at?: string
          id?: string
          pct?: number
          provider_id: string
          report_date?: string
        }
        Update: {
          balance?: number
          bucket?: string
          created_at?: string
          id?: string
          pct?: number
          provider_id?: string
          report_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_aging_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payer_mix: {
        Row: {
          created_at: string
          id: string
          name: string
          provider_id: string
          report_date: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          provider_id: string
          report_date?: string
          value?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          provider_id?: string
          report_date?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "payer_mix_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      revenue_trends: {
        Row: {
          adjustments: number
          charges: number
          created_at: string
          id: string
          month: string
          payments: number
          provider_id: string
          report_date: string
        }
        Insert: {
          adjustments?: number
          charges?: number
          created_at?: string
          id?: string
          month: string
          payments?: number
          provider_id: string
          report_date?: string
        }
        Update: {
          adjustments?: number
          charges?: number
          created_at?: string
          id?: string
          month?: string
          payments?: number
          provider_id?: string
          report_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_trends_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
