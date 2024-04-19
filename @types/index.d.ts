import { ChatInputCommandInteraction, Client, ContextMenuCommandBuilder, Message, SlashCommandBuilder, Snowflake } from "discord.js";

declare module "handler.dts" {
    //#region classes
    export class Application {
        constructor(client: Client, data?: {
            commands?: string,
            events?: string,
            owners?: Array<string | number>,
            validations?: string,
            prefix?: string,
            applicationCommands?: boolean
        });
        build(): void;
    }

    export class CommandBuilder {
        private static $: string;

        static $N(_$: TemplateStringsArray): typeof CommandBuilder; // setName
        static $D(description: string): typeof CommandBuilder; // setDescription
        static $C(cooldown: number): typeof CommandBuilder; // setCooldown
        static $O(somename?: boolean): typeof CommandBuilder; // Owners
        static $L(label: string): typeof CommandBuilder; // setLabel | setCategory

        static $S(builder: SlashCommandBuilder): typeof CommandBuilder; // setSlashCommandBuilder | interactionOn
        static $CM(builder: ContextMenuCommandBuilder): typeof CommandBuilder;

        static $M(call: (message: Message) => (Promise<any> | any)): typeof CommandBuilder; // setMessageExecution
        static $I(call: (interaction: ChatInputCommandInteraction) => (Promise<any> | any)): typeof CommandBuilder; // setInteractionExecution
        static $CME(call: (interaction: ChatInputCommandInteraction) => (Promise<any> | any)): typeof CommandBuilder;
    }

    export class EventBuilder {
        private static $: string;

        static $N(_$: TemplateStringsArray): typeof EventBuilder;
        static $E(call: (...arg0: any[]) => any): typeof EventBuilder;
        static $O(somename?: boolean): typeof EventBuilder;
    }

    //#endregion
}

export interface ApplicationData {
    readonly owners?: Array<string | number>;
    readonly prefix?: string;
    build: () => void;
}

declare module "discord.js" {
    export interface Client {
        Application: ApplicationData
    }

    export interface Message<InGuild extends boolean = boolean> {
        replyNoMention(options: string | MessagePayload | MessageReplyOptions): Promise<Message<InGuild>>;
        sendTimedMessage(options: string | MessagePayload | MessageReplyOptions, timeout: number): Promise<Message<InGuild>>;
        args(index: number): string | undefined;
        getUser(id: number | string | Snowflake, type?: 'cache' | 'fetch' | 'guild' | 'guild-fetch'): Promise<User>
    }
}