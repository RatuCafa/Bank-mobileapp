// lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          nama: string;
          balance: number;
          created_at: string;
        };

        Insert: {
          id?: string;
          nama: string;
          balance?: number;
          created_at?: string;
        };

        Update: {
          id?: string;
          nama?: string;
          balance?: number;
          created_at?: string;
        };

        Relationships: [];
      };

      transactions: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          amount: number;
          created_at: string;
          description: string | null;
          metadata: string | null;
        };

        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          amount: number;
          created_at?: string;
          description?: string | null;
          metadata?: string | null;
        };

        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          amount?: number;
          created_at?: string;
          description?: string | null;
          metadata?: string | null;
        };

        Relationships: [
          {
            foreignKeyName: "transactions_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };

    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
